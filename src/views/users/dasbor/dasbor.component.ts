import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "pages-dasbor-pengguna",
  imports: [CommonModule, Sidebar],
  standalone: true,
  styleUrl: "./dasbor.component.css",
  templateUrl: "./dasbor.component.html",
})
export class DasborPengguna {
  currentDate: string = "";
  currentTime: string = "";

  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;

  public statistics = [
    {
      title: 'Berat Badan',
      total: '65 kg',
      info: 'Normal',
      icon: 'fa-solid fa-camera',
      background: '#e6f0fd', // biru muda
      color: '#1976d2', // biru
    },
    {
      title: 'Tekanan Darah',
      total: '120/80 mmHg',
      info: 'Optimal',
      icon: 'fa-solid fa-heart-pulse',
      background: '#fdeaea', // merah muda
      color: '#e53935', // merah
    },
    {
      title: 'Gula Darah',
      total: '95 mg/dL',
      info: 'Normal',
      icon: 'fa-solid fa-droplet',
      background: '#fffbe6', // kuning muda
      color: '#fbc02d', // kuning
    },
  ];

  public makananList = [
    { nama: 'Nasi Goreng', waktu: '07:00', kalori: 350 },
    { nama: 'Ayam Bakar', waktu: '12:30', kalori: 400 },
    { nama: 'Salad Buah', waktu: '19:00', kalori: 150 },
  ];

  public aktivitasList = [
    { nama: 'Jalan Pagi', waktu: '06:00', kalori: 120 },
    { nama: 'Bersepeda', waktu: '17:00', kalori: 200 },
  ];

  public penyakitList = [
    { nama: 'Flu', waktu: '2 hari lalu', keterangan: 'Sudah sembuh' },
    { nama: 'Alergi', waktu: '1 minggu lalu', keterangan: 'Masih dalam pemantauan' },
  ];

  constructor(private title: Title, private meta: Meta) {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Dasbor | SEHATIN", "");
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
