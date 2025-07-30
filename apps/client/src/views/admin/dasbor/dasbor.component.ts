import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { getAllDistricts } from "indonesia-nodejs";
import { NgChartsModule } from "ng2-charts";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Header as SharedHeader } from "@shared/header/header.component";
import { SidebarService } from "@services/sidebar.service";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "halaman-admin-dasbor",
  standalone: true,
  imports: [CommonModule, Sidebar, NgChartsModule, FormsModule, SharedHeader],
  templateUrl: "./dasbor.component.html",
  styleUrl: "./dasbor.component.css",
})
export class DasborAdmin implements OnDestroy, OnInit {
  penyakitDipilih = "total";
  tampilkanModalUji = false;
  tipePengguna = "admin";
  waktuSekarang = new Date().toLocaleTimeString("id-ID");

  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  tanggalHariIni = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  dataBaru = {
    kecamatan: "",
    penyakit: "diabetes",
    jumlah: 0,
    tahun: 2025,
  };

  daftarPenyakit = [
    { label: "Total Penderita", value: "total" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Kardiovaskular", value: "kardiovaskular" },
    { label: "Obesitas", value: "obesitas" },
    { label: "Hipertensi", value: "hipertensi" },
    { label: "Kolesterol", value: "kolesterol" },
  ];

  daftarKecamatan: string[] = [];
  tahunTersedia = [2020, 2021, 2022, 2023, 2024, 2025];
  tahunDipilih = 2025;
  dataPenyakitPertahun: Record<number, Record<string, number[]>> = {};
  dataPenyakitAktif: Record<string, number[]> = {};

  tipeGrafikBatang: ChartType = "bar";
  dataGrafikBatang!: ChartData<"bar", number[], string>;

  labelGrafikPie = ["Diabetes", "Kardiovaskular", "Obesitas", "Hipertensi", "Kolesterol"];
  dataGrafikLingkaran: ChartData<"pie", number[], string> = {
    labels: this.labelGrafikPie,
    datasets: [
      {
        data: [100, 80, 120, 150, 90],
        backgroundColor: ["#0ea5e9", "#f59e42", "#22d3ee", "#10b981", "#8b5cf6"],
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 8,
      },
    ],
  };

  labelGrafikGaris = this.tahunTersedia.map(String);
  dataGrafikGaris: ChartData<"line"> = {
    labels: this.labelGrafikGaris,
    datasets: [
      this.buatDatasetGaris("Diabetes", "#0ea5e9", 20, 70),
      this.buatDatasetGaris("Kardiovaskular", "#f59e42", 15, 55),
      this.buatDatasetGaris("Obesitas", "#22d3ee", 25, 85),
      this.buatDatasetGaris("Hipertensi", "#10b981", 30, 110),
      this.buatDatasetGaris("Kolesterol", "#8b5cf6", 20, 65),
    ],
  };

  opsiGrafikBatang: ChartOptions = this.konfigurasiGrafik("bar");
  opsiGrafikLingkaran: ChartOptions = this.konfigurasiGrafik("pie");
  opsiGrafikGaris: ChartOptions = this.konfigurasiGrafik("line");

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Dasbor | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  async ngOnInit() {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));

    this.daftarKecamatan = (await getAllDistricts())
      .filter(d => d.city_code === 3507)
      .map(d => d.name)
      .sort((a, b) => a.localeCompare(b));

    this.inisialisasiDataPertahun();
    this.ambilDataLokal();
    this.validasiDanPerbaikiData();

    this.dataGrafikBatang = this.bentukDataGrafikBatang();
    this.perbaruiSemuaGrafik();

    setTimeout(() => this.perbaruiGrafikPie(), 100);
  }

  acakAngka(min: number, max: number, jumlah: number): number[] {
    return Array.from({ length: jumlah }, () => Math.floor(Math.random() * (max - min + 1)) + min);
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

  konfigurasiGrafik(tipe: ChartType): ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: tipe !== "bar", position: tipe === "line" ? "top" : "bottom", labels: { color: "#334155", font: { size: 14 } } },
        tooltip: {
          backgroundColor: tipe === "pie" ? "#0ea5e9" : "#b74660",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: tipe === "pie" ? "#38bdf8" : "#b74660",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
        },
      },
      scales: tipe !== "pie" ? {
        x: { ticks: { color: "#0ea5e9" }, grid: { color: "#e0e7ef" } },
        y: { beginAtZero: true, ticks: { color: "#64748b" }, grid: { color: "#e0e7ef" } },
      } : undefined,
    };
  }

  inisialisasiDataPertahun() {
    const jumlah = this.daftarKecamatan.length || 33;
    for (const tahun of this.tahunTersedia) {
      this.dataPenyakitPertahun[tahun] ||= {
        diabetes: this.acakAngka(20, 70, jumlah),
        kardiovaskular: this.acakAngka(15, 55, jumlah),
        obesitas: this.acakAngka(25, 85, jumlah),
        hipertensi: this.acakAngka(30, 110, jumlah),
        kolesterol: this.acakAngka(20, 65, jumlah),
      };
    }
    this.dataPenyakitAktif = this.dataPenyakitPertahun[this.tahunDipilih];
  }

  perbaruiGrafikBatang() {
    const totalData = this.daftarKecamatan.map((_, i) => {
      return this.penyakitDipilih === "total"
        ? this.daftarPenyakit.slice(1).reduce((sum, p) => sum + (this.dataPenyakitAktif[p.value]?.[i] || 0), 0)
        : this.dataPenyakitAktif[this.penyakitDipilih]?.[i] || 0;
    });
    this.dataGrafikBatang.datasets[0].data = totalData;
  }

  perbaruiGrafikPie() {
    const tahunData = this.dataPenyakitPertahun[this.tahunDipilih];
    if (!tahunData) return;

    const data = this.daftarPenyakit.slice(1).map(p => tahunData[p.value]?.reduce((a, b) => a + b, 0) || 0);
    this.dataGrafikLingkaran.datasets[0].data = data.some(v => v > 0) ? data : [100, 80, 120, 150, 90];
  }

  perbaruiSemuaGrafik() {
    this.perbaruiGrafikBatang();
    this.perbaruiGrafikPie();
  }

  ubahTahun() {
    this.dataPenyakitAktif = this.dataPenyakitPertahun[this.tahunDipilih];
    this.perbaruiSemuaGrafik();
    this.simpanKeLocalStorage();
    setTimeout(() => this.perbaruiGrafikPie(), 50);
  }

  ubahPenyakit() {
    this.perbaruiSemuaGrafik();
    this.simpanKeLocalStorage();
    setTimeout(() => this.perbaruiGrafikPie(), 50);
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
    if (!simpanan) return;
    const data = JSON.parse(simpanan);
    this.dataPenyakitPertahun = data.dataPenyakitPertahun || {};
    this.penyakitDipilih = data.penyakitDipilih || this.penyakitDipilih;
    this.tahunDipilih = data.tahunDipilih || this.tahunDipilih;
  }

  validasiDanPerbaikiData() {
    const jumlah = this.daftarKecamatan.length || 33;
    for (const tahun of this.tahunTersedia) {
      const data = this.dataPenyakitPertahun[tahun];
      if (!data) continue;
      for (const p of this.daftarPenyakit.slice(1)) {
        if (!data[p.value] || data[p.value].length !== jumlah) {
          data[p.value] = this.acakAngka(20, 70, jumlah);
        }
      }
    }
  }

  bukaModalUji() {
    this.tampilkanModalUji = true;
  }

  tutupModalUji() {
    this.tampilkanModalUji = false;
    this.dataBaru = { kecamatan: "", penyakit: "diabetes", jumlah: 0, tahun: 2025 };
  }

  tambahDataUji() {
    const index = this.daftarKecamatan.indexOf(this.dataBaru.kecamatan);
    if (index === -1 || this.dataBaru.jumlah <= 0) return alert("Isian tidak valid.");

    const tahunData = this.dataPenyakitPertahun[this.dataBaru.tahun] ||= {
      diabetes: [], kardiovaskular: [], obesitas: [], hipertensi: [], kolesterol: []
    };
    tahunData[this.dataBaru.penyakit][index] = this.dataBaru.jumlah;

    if (this.dataBaru.tahun === this.tahunDipilih) {
      this.dataPenyakitAktif = tahunData;
      this.perbaruiSemuaGrafik();
    }

    this.simpanKeLocalStorage();
    this.tutupModalUji();
    alert("Data berhasil ditambahkan!");
  }
}