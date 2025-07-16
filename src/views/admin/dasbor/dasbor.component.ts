import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { getAllDistricts } from "indonesia-nodejs";
import { NgChartsModule } from "ng2-charts";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "halaman-admin-dasbor",
  standalone: true,
  imports: [CommonModule, Sidebar, NgChartsModule, FormsModule],
  templateUrl: "./dasbor.component.html",
  styleUrl: "./dasbor.component.css",
})
export class DasborAdmin implements OnInit {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle("Dasbor Admin | SEHATIN");
    this.meta.addTags([
      {
        name: "description",
        content: "Dasbor Admin",
      },
      {
        property: "og:title",
        content: "Dasbor Admin",
      },
      {
        property: "og:description",
        content: "Dasbor Admin",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Dasbor Admin",
      },
      {
        property: "twitter:description",
        content: "Dasbor Admin",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }

  penyakitDipilih = "kolesterol";
  tampilkanModalUji = false;
  tipePengguna = "admin";
  waktuSekarang = new Date().toLocaleTimeString("id-ID");
  tanggalHariIni = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  dataBaru = {
    kecamatan: "",
    penyakit: "kolesterol",
    jumlah: 0,
    tahun: 2025,
  };

  daftarPenyakit = [
    { label: "Kolesterol", value: "kolesterol" },
    { label: "Hipertensi", value: "hipertensi" },
    { label: "Diabetes", value: "diabetes" },
  ];

  daftarKecamatan: string[] = [];
  tahunTersedia = [2020, 2021, 2022, 2023, 2024, 2025];
  tahunDipilih = 2025;
  dataPenyakitPertahun: Record<number, Record<string, number[]>> = {};
  dataPenyakitAktif: Record<string, number[]> = {};

  // Opsi grafik batang
  opsiGrafikBatang: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: "#b74660",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#b74660",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#0ea5e9", font: { size: 12 } },
        grid: { color: "#e0e7ef" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#64748b", font: { size: 12 } },
        grid: { color: "#e0e7ef" },
      },
    },
  };

  tipeGrafikBatang: ChartType = "bar";
  dataGrafikBatang = this.bentukDataGrafikBatang();

  labelGrafikPie = ["Kolesterol", "Hipertensi", "Diabetes"];
  dataGrafikLingkaran: ChartData<"pie", number[], string> = {
    labels: this.labelGrafikPie,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#0ea5e9", "#f59e42", "#22d3ee"],
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 8,
      },
    ],
  };

  opsiGrafikLingkaran: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#334155", font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: "#0ea5e9",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#38bdf8",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  labelGrafikGaris = this.tahunTersedia.map(String);
  dataGrafikGaris: ChartData<"line"> = {
    labels: this.labelGrafikGaris,
    datasets: [
      this.buatDatasetGaris("Kolesterol", "#0ea5e9", 100, 300),
      this.buatDatasetGaris("Hipertensi", "#f59e42", 80, 200),
      this.buatDatasetGaris("Diabetes", "#22d3ee", 50, 150),
    ],
  };

  opsiGrafikGaris: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#334155", font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: "#0ea5e9",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#38bdf8",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: { ticks: { color: "#0ea5e9" }, grid: { color: "#e0e7ef" } },
      y: {
        beginAtZero: true,
        ticks: { color: "#64748b" },
        grid: { color: "#e0e7ef" },
      },
    },
  };

  async ngOnInit() {
    this.inisialisasiDataPertahun();
    this.ambilDataLokal();
    this.perbaruiSemuaGrafik();
    this.daftarKecamatan = (await getAllDistricts()).filter((district) => district.city_code === 3507).map((district) => district.name).sort((a, b) => a.localeCompare(b));
    this.dataGrafikBatang = this.bentukDataGrafikBatang();
    this.perbaruiSemuaGrafik();
  }

  acakAngka(min: number, max: number, jumlah: number): number[] {
    return Array(jumlah).fill(0).map(() => Math.floor(Math.random() * (max - min + 1)) + min);
  }

  buatDatasetGaris(label: string, warna: string, min: number, max: number) {
    return {
      label,
      data: this.tahunTersedia.map(() => Math.floor(Math.random() * (max - min) + min)),
      borderColor: warna,
      backgroundColor: warna + "22",
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: warna,
      fill: true,
    };
  }

  bentukDataGrafikBatang(): ChartData<"bar", number[], string> {
    return {
      labels: this.daftarKecamatan,
      datasets: [
        {
          data: [],
          label: "Jumlah Kasus",
          backgroundColor: "#0ea5e9",
          borderRadius: 8,
          hoverBackgroundColor: "#22d3ee",
          maxBarThickness: 32,
        },
      ],
    };
  }

  inisialisasiDataPertahun() {
    for (const tahun of this.tahunTersedia) {
      if (!this.dataPenyakitPertahun[tahun]) {
        this.dataPenyakitPertahun[tahun] = {
          kolesterol: this.acakAngka(20, 120, 33),
          hipertensi: this.acakAngka(10, 100, 33),
          diabetes: this.acakAngka(5, 80, 33),
        };
      }
    }
    this.dataPenyakitAktif = this.dataPenyakitPertahun[this.tahunDipilih];
  }

  perbaruiGrafikBatang() {
    this.dataGrafikBatang.datasets[0].data = this.dataPenyakitAktif[this.penyakitDipilih] || [];
  }

  perbaruiGrafikPie() {
    const tahunIni = this.dataPenyakitPertahun[this.tahunDipilih];
    this.dataGrafikLingkaran.datasets[0].data = [
      tahunIni["kolesterol"].reduce((a, b) => a + b, 0),
      tahunIni["hipertensi"].reduce((a, b) => a + b, 0),
      tahunIni["diabetes"].reduce((a, b) => a + b, 0),
    ];
  }

  perbaruiSemuaGrafik() {
    this.perbaruiGrafikBatang();
    this.perbaruiGrafikPie();
  }

  ubahTahun() {
    this.dataPenyakitAktif = this.dataPenyakitPertahun[this.tahunDipilih];
    this.perbaruiSemuaGrafik();
    this.simpanKeLocalStorage();
  }

  ubahPenyakit() {
    this.perbaruiSemuaGrafik();
    this.simpanKeLocalStorage();
  }

  simpanKeLocalStorage() {
    localStorage.setItem("dataDasbor", JSON.stringify({
      dataPenyakitPertahun: this.dataPenyakitPertahun,
      penyakitDipilih: this.penyakitDipilih,
      tahunDipilih: this.tahunDipilih,
    }));
  }

  ambilDataLokal() {
    const simpanan = localStorage.getItem("dataDasbor");
    if (simpanan) {
      const data = JSON.parse(simpanan);
      this.dataPenyakitPertahun = data.dataPenyakitPertahun || {};
      this.penyakitDipilih = data.penyakitDipilih || this.penyakitDipilih;
      this.tahunDipilih = data.tahunDipilih || this.tahunDipilih;
      this.inisialisasiDataPertahun();
    }
  }

  // Modal tambah data uji
  bukaModalUji() {
    this.tampilkanModalUji = true;
  }

  tutupModalUji() {
    this.tampilkanModalUji = false;
    this.dataBaru = {
      kecamatan: "",
      penyakit: "kolesterol",
      jumlah: 0,
      tahun: 2025,
    };
  }

  tambahDataUji() {
    const indeks = this.daftarKecamatan.indexOf(this.dataBaru.kecamatan);
    if (indeks === -1 || this.dataBaru.jumlah <= 0) {
      alert("Isian tidak valid.");
      return;
    }

    if (!this.dataPenyakitPertahun[this.dataBaru.tahun]) {
      this.dataPenyakitPertahun[this.dataBaru.tahun] = {
        kolesterol: Array(33).fill(0),
        hipertensi: Array(33).fill(0),
        diabetes: Array(33).fill(0),
      };
    }

    this.dataPenyakitPertahun[this.dataBaru.tahun][this.dataBaru.penyakit][indeks] = this.dataBaru.jumlah;

    if (this.dataBaru.tahun === this.tahunDipilih) {
      this.dataPenyakitAktif = this.dataPenyakitPertahun[this.tahunDipilih];
      this.perbaruiSemuaGrafik();
    }

    this.simpanKeLocalStorage();
    this.tutupModalUji();
    alert("Data berhasil ditambahkan!");
  }
}