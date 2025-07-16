import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Meta, Title } from "@angular/platform-browser";

export type Statistics = {
  background: string;
  color: string;
  icon: string;
  info: string;
  title: string;
  total: string;
};

@Component({
  selector: "pages-dasbor-pengguna",
  imports: [CommonModule, Sidebar],
  templateUrl: "./dasbor.component.html",
  styleUrl: "./dasbor.component.css",
})
export class DasborPengguna {
  currentDate: string = "";
  currentTime: string = "";

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
  ];

  makananList = [
    { nama: 'Nasi Goreng', waktu: '08:00', kalori: 350 },
    { nama: 'Ayam Bakar', waktu: '12:30', kalori: 400 },
    { nama: 'Salad Buah', waktu: '16:00', kalori: 150 },
    { nama: 'Susu Kedelai', waktu: '20:00', kalori: 120 },
  ];

  aktivitasList = [
    { nama: 'Jalan Pagi', waktu: '06:30', kalori: 80 },
    { nama: 'Bersepeda', waktu: '17:00', kalori: 120 },
  ];

  penyakitList = [
    { nama: 'Flu', waktu: '10 Mei 2024', keterangan: 'Sembuh' },
    { nama: 'Alergi Debu', waktu: '20 April 2024', keterangan: 'Masih ringan' },
  ];

  constructor(private title: Title, private meta: Meta) {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.title.setTitle("Dasbor Pengguna | SEHATIN");
    this.meta.addTags([
      {
        name: "description",
        content: "Dasbor Pengguna",
      },
      {
        property: "og:title",
        content: "Dasbor Pengguna",
      },
      {
        property: "og:description",
        content: "Dasbor Pengguna",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Dasbor Pengguna",
      },
      {
        property: "twitter:description",
        content: "Dasbor Pengguna",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
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
