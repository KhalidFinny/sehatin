import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

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
export class Beranda implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
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
    this.animatedStats = this.statistics.map(() => 0);
    this.animateAllStats();
  }

  animateAllStats() {
    this.statistics.forEach((stat, i) => {
      this.animateCountUp(i, stat.value, 1500); // 1.5 detik
    });
  }

  animateCountUp(index: number, endVal: number, duration: number) {
    if (!isPlatformBrowser(this.platformId)) {
      this.animatedStats[index] = endVal;
      return;
    }
    const frameRate = 60; // 60fps
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;
    const startVal = 0;
    const sub = interval(1000 / frameRate)
      .pipe(takeWhile(() => frame <= totalFrames))
      .subscribe(() => {
        frame++;
        const progress = frame / totalFrames;
        const value = Math.round(progress * (endVal - startVal) + startVal);
        this.animatedStats[index] = value;
        if (frame >= totalFrames) {
          this.animatedStats[index] = endVal;
          sub.unsubscribe();
        }
      });
  }
}
