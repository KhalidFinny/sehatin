import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

type Doctors = {
  image: string;
  name: string;
  specialist: string;
  star: number;
  feedback: number;
  experience: string;
  place: string;
  link: string | URL;
}

type Statistics = {
  color: string;
  icon: string;
  value: number;
  title: string;
  description: string;
};

@Component({
  selector: "pages-beranda",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./beranda.component.html",
  styleUrl: "./beranda.component.css",
})
export class Beranda {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {
    this.title.setTitle("Beranda | SEHATIN");
    this.meta.addTags([
      {
        name: "description",
        content: "Beranda",
      },
      {
        property: "og:title",
        content: "Beranda",
      },
      {
        property: "og:description",
        content: "Beranda",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Beranda",
      },
      {
        property: "twitter:description",
        content: "Beranda",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }

  statistics: Statistics[] = [
    {
      color: "blue",
      icon: "fa-solid fa-user-group",
      value: 100,
      title: "Pengguna Aktif",
      description: "Pengguna terdaftar di platform",
    },
    {
      color: "red",
      icon: "fa-solid fa-heart",
      value: 100,
      title: "Pasien Terobati",
      description: "Pasien terobati di platform",
    },
    {
      color: "green",
      icon: "fa-solid fa-building",
      value: 25,
      title: "Rumah Sakit Partner",
      description: "Jaringan rumah sakit terpercaya",
    },
    {
      color: "cyan",
      icon: "fa-solid fa-arrow-trend-up",
      value: 98,
      title: "Tingkat Kepuasan",
      description: "Penilaian kepuasan pengguna",
    },
  ];

  doctors: Doctors[] = [
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
      image: "/images/khalid.svg",
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