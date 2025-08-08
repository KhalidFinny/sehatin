import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BasePage } from "@helpers/base-page";

type Doctors = {
  image: string;
  name: string;
  specialist: string;
  star: number;
  feedback: number;
  experience: string;
  place: string;
  link: string | URL;
};

type Feature = {
  color: string;
  icon: string;
  title: string;
  description: string;
  link?: string;
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
      link: "/skrining-ptm"
    },
    {
      color: "green",
      icon: "fa-solid fa-chart-line",
      title: "Analitik Kecamatan",
      description: "Visualisasi data kesehatan per kecamatan untuk monitoring wilayah",
      link: "/analitik-kecamatan"
    },
    {
      color: "purple",
      icon: "fa-solid fa-users-cog",
      title: "Analitik Pengguna",
      description: "Dashboard analitik lengkap untuk monitoring aktivitas dan profil pengguna",
      link: "/analitik-pengguna"
    },
    {
      color: "orange",
      icon: "fa-solid fa-notes-medical",
      title: "Rekap Kesehatan",
      description: "Riwayat kesehatan lengkap dan terstruktur untuk pemantauan berkelanjutan",
      link: "/rekap-kesehatan"
    },
  ];

  public doctors: Doctors[] = [
    {
      image: "/images/rafi.svg",
      name: "Dr. Rafi Abiyyu Airlangga",
      specialist: "Spesialis Gigi",
      star: 5,
      feedback: 127,
      experience: "8+ tahun pengalaman",
      place: "RSIA Dr. Munir",
      link: "https://wa.me/+6282143494259",
    },
    {
      image: "/images/khalid.png",
      name: "Dr. Muhammad Khalid Atthoriq",
      specialist: "Spesialis Penyakit Dalam",
      star: 5,
      feedback: 203,
      experience: "12+ tahun pengalaman",
      place: "RSIA Dr. Munir",
      link: "https://wa.me/+6281230400332",
    },
    {
      image: "/images/yonanda.svg",
      name: "Dr. Yonanda Mayla Rusdiaty",
      specialist: "Dokter Ibu dan Anak",
      star: 5,
      feedback: 156,
      experience: "10+ tahun pengalaman",
      place: "RSIA Dr. Munir",
      link: "https://wa.me/+6282139631334",
    },
  ];


}