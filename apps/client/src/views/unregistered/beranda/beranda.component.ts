import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BasePage } from "@helpers/base-page";

type Feature = {
  color: string;
  icon: string;
  title: string;
  description: string;
  link?: string;
};

type TutorialStep = {
  title: string;
  description: string;
};

@Component({
  selector: "pages-beranda",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./beranda.component.html",
  styleUrl: "./beranda.component.css",
})
export class Beranda {
  private pageAttributes: BasePage;

  constructor(title: Title, meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Beranda | SEHATIN", "");
  }

  public features: Feature[] = [
    {
      color: "blue",
      icon: "fa-solid fa-clipboard-check",
      title: "Skrining PTM",
      description: "Deteksi dini faktor risiko penyakit tidak menular dengan sistem skrining komprehensif",
      link: "/skrining-ptm",
    },
    {
      color: "green",
      icon: "fa-solid fa-chart-line",
      title: "Analitik Kecamatan",
      description: "Visualisasi data kesehatan per kecamatan untuk monitoring wilayah",
      link: "/analitik-kecamatan",
    },
    {
      color: "purple",
      icon: "fa-solid fa-users-cog",
      title: "Analitik Pengguna",
      description: "Dashboard analitik lengkap untuk monitoring aktivitas dan profil pengguna",
      link: "/analitik-pengguna",
    },
    {
      color: "orange",
      icon: "fa-solid fa-notes-medical",
      title: "Rekap Kesehatan",
      description: "Riwayat kesehatan lengkap dan terstruktur untuk pemantauan berkelanjutan",
      link: "/rekap-kesehatan",
    },
  ];

  public tutorialSteps: TutorialStep[] = [
    {
      title: "Login atau Daftar Akun",
      description: "Login ke akun SEHATIN Anda. Jika belum memiliki akun, silakan daftar terlebih dahulu dengan mengisi data diri yang valid.",
    },
    {
      title: "Lengkapi Profil Kesehatan",
      description: "Setelah login, wajib melengkapi profil untuk kebutuhan data kesehatan lebih lanjut. Data ini penting untuk analisis yang akurat.",
    },
    {
      title: "Akses Menu Skrining PTM",
      description: "Navigasi ke menu 'Skrining PTM' yang tersedia di dashboard pengguna untuk memulai proses skrining.",
    },
    {
      title: "Menjawab Pertanyaan Skrining",
      description: "Jawab pertanyaan dengan 'Ya' atau 'Tidak' sesuai kondisi Anda. Pertanyaan dirancang untuk mendeteksi faktor risiko PTM.",
    },
    {
      title: "Terima Hasil Skrining",
      description: "Sistem akan mengakumulasi jawaban Anda dan menampilkan hasil indikasi risiko PTM yang didapatkan.",
    },
    {
      title: "Pantau Kesehatan Harian",
      description: "Kunjungi menu 'Rekap Kesehatan' untuk memasukkan data keseharian seperti makanan dan aktivitas fisik untuk pemantauan yang dipersonalisasi.",
    },
  ];
}