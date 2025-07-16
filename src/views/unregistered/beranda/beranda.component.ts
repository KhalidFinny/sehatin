import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { interval } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { BasePage } from "helpers/base-page";

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
export class Beranda implements OnInit {
  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta, @Inject(PLATFORM_ID) private platformId: Object) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Beranda | SEHATIN", "");
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

  animatedStats: number[] = [];
  ngOnInit() {
    this.animateAllStats(1500); // durasi 1.5 detik
  }

  animateAllStats(duration: number = 1000) {
    if (!isPlatformBrowser(this.platformId)) {
      this.animatedStats = this.statistics.map((stat) => stat.value);
      return;
    }

    const frameRate = 60; // 60 fps
    const totalFrame = Math.round((duration / 1000) * frameRate);
    let frame = 0;
    this.animatedStats = this.statistics.map(() => 0);

    const sub = interval(1000 / frameRate)
      .pipe(takeWhile(() => frame <= totalFrame))
      .subscribe(() => {
        frame++;
        const progress = frame / totalFrame;
        this.animatedStats = this.statistics.map((stat, i) => frame >= totalFrame ? stat.value : Math.round(progress * stat.value));
        if (frame >= totalFrame) sub.unsubscribe();
      });
  }
}