import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Table } from "@shared/table/table.component";
import { HealthRecord, HealthRecordData, HealthRecordTable } from "@services/health-record.service";

export type Statistics = {
  background: string;
  color: string;
  icon: string;
  info: string;
  title: string;
  total: string;
};

@Component({
  selector: "pages-rekap-kesehatan",
  imports: [CommonModule, Header, RouterModule, Sidebar, Table],
  templateUrl: "./rekap-kesehatan.component.html",
  standalone: true,
  styleUrl: "./rekap-kesehatan.component.css",
})
export class RekapKesehatan implements OnDestroy, OnInit {
  public currentDate: string = "";
  public currentTime: string = "";
  public isSidebarOpen: boolean = true;
  public rows: [number, ...string[]][] = [];

  private sidebarSubscription!: Subscription;
  private pageAttributes: BasePage;
  private intervalId: NodeJS.Timeout;

  public statistics: Statistics[] = [
    {
      background: "#dbeafe",
      color: "#155dfc",
      icon: "fa-solid fa-weight-scale",
      title: "Berat Badan",
      total: "65 kg",
      info: "Normal",
    },
    {
      background: "#ffe2e2",
      color: "#e7000b",
      icon: "fa-solid fa-heart-pulse",
      title: "Tekanan Darah",
      total: "120/80 mmHg",
      info: "Optimal",
    },
    {
      background: "#fef9c2",
      color: "#d08700",
      icon: "fa-solid fa-droplet",
      title: "Gula Darah",
      total: "95 mg/dL",
      info: "Normal",
    },
    {
      background: "#dcfce7",
      color: "#00a63e",
      icon: "fa-solid fa-person-running",
      title: "Aktivitas Fisik",
      total: "30 menit/hari",
      info: "Cukup Aktif",
    },
  ];

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Rekap Kesehatan | SEHATIN", "");
    this.updateDateTime();
    this.intervalId = setInterval(() => this.updateDateTime(), 60000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
    this.rows = (HealthRecord.getAll() as HealthRecordData[]).map((data, i) => [
      i + 1,
      (data.usia ?? 0).toString() + " tahun",
      (data.berat_badan ?? 0).toString(),
      (data.tinggi_badan ?? 0).toString(),
      (data.tingkat_aktivitas_fisik ?? "-").toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      data.pola_tidur ?? "-",
    ]);
  }

  private updateDateTime() {
    const now = new Date();

    this.currentDate = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    this.currentTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}