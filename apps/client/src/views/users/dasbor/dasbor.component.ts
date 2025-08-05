import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Meta, Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "pages-dasbor-pengguna",
  imports: [CommonModule, Header, Sidebar],
  standalone: true,
  styleUrl: "./dasbor.component.css",
  templateUrl: "./dasbor.component.html",
})
export class DasborPengguna implements OnDestroy, OnInit {
  currentDate: string = "";
  currentTime: string = "";

  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  public statistics = [{
    title: "Berat Badan",
    total: "65 kg",
    info: "Normal",
    icon: "fa-solid fa-camera",
    background: "#e6f0fd", // Light Blue.
    color: "#1976d2", // Regular Blue.
  },
  {
    title: "Tekanan Darah",
    total: "120/80 mmHg",
    info: "Optimal",
    icon: "fa-solid fa-heart-pulse",
    background: "#fdeaea", // Pink.
    color: "#e53935", // Regular Red.
  },
  {
    title: "Gula Darah",
    total: "95 mg/dL",
    info: "Normal",
    icon: "fa-solid fa-droplet",
    background: "#fffbe6", // Light Yellow.
    color: "#fbc02d", // Regular Yellow.
  }];

  listOfFoods = [
    { nama: "Nasi Goreng", waktu: "07:00", kalori: 350 },
    { nama: "Ayam Bakar", waktu: "12:30", kalori: 400 },
    { nama: "Salad Buah", waktu: "19:00", kalori: 150 },
  ];

  listOfActivities = [
    { nama: "Jalan Pagi", waktu: "06:00", kalori: 120 },
    { nama: "Bersepeda", waktu: "17:00", kalori: 200 },
  ];

  listOfDiseases = [
    { nama: "Flu", waktu: "2 hari lalu", keterangan: "Sudah sembuh" },
    { nama: "Alergi", waktu: "1 minggu lalu", keterangan: "Masih dalam pemantauan" },
  ];

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Dasbor | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
  }

  updateDateTime() {
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
      second: "2-digit",
    });
  }
}