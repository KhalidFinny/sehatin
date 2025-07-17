import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BasePage } from "@helpers/base-page";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Table } from "@shared/table/table.component";

type Statistics = {
  background: string;
  color: string;
  icon: string;
  info: string;
  title: string;
  total: string;
};

@Component({
  selector: "pages-rekap-kesehatan",
  imports: [CommonModule, Table, RouterModule, Sidebar],
  templateUrl: "./rekap-kesehatan.component.html",
  standalone: true,
  styleUrl: "./rekap-kesehatan.component.css",
})
export class RekapKesehatan {
  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;
  currentDate: string = '';
  currentTime: string = '';
  private intervalId: any;

  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Rekap Kesehatan | SEHATIN", "");
    this.updateDateTime();
    this.intervalId = setInterval(() => this.updateDateTime(), 60000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    this.currentTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit',
    });
  }

  statistics: Statistics[] = [
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

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
