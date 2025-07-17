import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { getAllDistricts } from "indonesia-nodejs";
import { NgChartsModule } from "ng2-charts";
import { Sidebar } from "@shared/sidebar/sidebar.component";

/**
 * Component untuk menampilkan dasbor admin dengan berbagai grafik
 * Fitur utama:
 * - Grafik batang: Statistik penyakit per kecamatan
 * - Grafik pie: Proporsi kasus penyakit
 * - Grafik garis: Tren penyakit per tahun
 * - Filter berdasarkan penyakit dan tahun
 * - Modal untuk menambah data uji
 * - Penyimpanan data di localStorage
 */
@Component({
  selector: "halaman-admin-dasbor",
  standalone: true,
  imports: [CommonModule, Sidebar, NgChartsModule, FormsModule],
  templateUrl: "./dasbor.component.html",
  styleUrl: "./dasbor.component.css",
})
export class DasborAdmin implements OnInit {
  /**
   * Constructor untuk inisialisasi component
   * Mengatur title dan meta tags untuk SEO
   * @param title - Service untuk mengatur title halaman
   * @param meta - Service untuk mengatur meta tags
   */
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

  /** Penyakit yang dipilih untuk filter (default: total) */
  penyakitDipilih = "total";
  /** Status untuk menampilkan/menyembunyikan modal tambah data */
  tampilkanModalUji = false;
  /** Tipe pengguna (admin) */
  tipePengguna = "admin";
  /** Waktu sekarang dalam format Indonesia */
  waktuSekarang = new Date().toLocaleTimeString("id-ID");
  /** Tanggal hari ini dalam format Indonesia */
  tanggalHariIni = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /**
   * Data untuk modal tambah data uji
   * @type {Object}
   */
  dataBaru = {
    kecamatan: "",
    penyakit: "diabetes",
    jumlah: 0,
    tahun: 2025,
  };

  /**
   * Daftar penyakit yang tersedia untuk filter
   * @type {Array<{label: string, value: string}>}
   */
  daftarPenyakit = [
    { label: "Total Penderita", value: "total" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Kardiovaskular", value: "kardiovaskular" },
    { label: "Obesitas", value: "obesitas" },
    { label: "Hipertensi", value: "hipertensi" },
    { label: "Kolesterol", value: "kolesterol" },
  ];

  /** Array berisi nama-nama kecamatan */
  daftarKecamatan: string[] = [];
  /** Array berisi tahun yang tersedia untuk filter */
  tahunTersedia = [2020, 2021, 2022, 2023, 2024, 2025];
  /** Tahun yang dipilih untuk filter (default: 2025) */
  tahunDipilih = 2025;
  /** Data penyakit per tahun untuk setiap kecamatan */
  dataPenyakitPertahun: Record<number, Record<string, number[]>> = {};
  /** Data penyakit aktif untuk tahun yang dipilih */
  dataPenyakitAktif: Record<string, number[]> = {};

  /**
   * Konfigurasi opsi untuk grafik batang
   * Mengatur responsive, tooltip, dan styling
   */
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

  /** Tipe grafik batang */
  tipeGrafikBatang: ChartType = "bar";
  /** Data untuk grafik batang */
  dataGrafikBatang = this.bentukDataGrafikBatang();

  /** Label untuk grafik pie (jenis penyakit) */
  labelGrafikPie = ["Diabetes", "Kardiovaskular", "Obesitas", "Hipertensi", "Kolesterol"];
  /**
   * Data untuk grafik pie
   * Menampilkan proporsi kasus penyakit tidak menular
   */
  dataGrafikLingkaran: ChartData<"pie", number[], string> = {
    labels: this.labelGrafikPie,
    datasets: [
      {
        data: [100, 80, 120, 150, 90], // Data default yang tidak kosong
        backgroundColor: ["#0ea5e9", "#f59e42", "#22d3ee", "#10b981", "#8b5cf6"],
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 8,
      },
    ],
  };

  /**
   * Konfigurasi opsi untuk grafik pie
   * Mengatur legend, tooltip, dan styling
   */
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

  /** Label untuk grafik garis (tahun) */
  labelGrafikGaris = this.tahunTersedia.map(String);
  /**
   * Data untuk grafik garis
   * Menampilkan tren kasus penyakit per tahun
   */
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

  /**
   * Konfigurasi opsi untuk grafik garis
   * Mengatur legend, tooltip, scales, dan styling
   */
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

  /**
   * Lifecycle hook yang dipanggil setelah component diinisialisasi
   * Mengambil data kecamatan dan menginisialisasi grafik
   */
  async ngOnInit() {
    // Ambil data kecamatan terlebih dahulu
    this.daftarKecamatan = (await getAllDistricts()).filter((district) => district.city_code === 3507).map((district) => district.name).sort((a, b) => a.localeCompare(b));

    // Inisialisasi data penyakit setelah data kecamatan tersedia
    this.inisialisasiDataPertahun();
    this.ambilDataLokal();
    this.validasiDanPerbaikiData();

    // Perbarui semua grafik setelah data tersedia
    this.dataGrafikBatang = this.bentukDataGrafikBatang();
    this.perbaruiSemuaGrafik();

    // Pastikan pie chart diperbarui dengan data yang benar
    setTimeout(() => {
      this.perbaruiGrafikPie();
    }, 100);
  }

  /**
   * Menghasilkan array angka acak dalam range tertentu
   * @param {number} min - Nilai minimum
   * @param {number} max - Nilai maksimum
   * @param {number} jumlah - Jumlah angka yang dihasilkan
   * @returns {number[]} Array berisi angka acak
   */
  acakAngka(min: number, max: number, jumlah: number): number[] {
    return Array(jumlah).fill(0).map(() => Math.floor(Math.random() * (max - min + 1)) + min);
  }

  /**
   * Membuat dataset untuk grafik garis
   * @param {string} label - Label untuk dataset
   * @param {string} warna - Warna untuk dataset
   * @param {number} min - Nilai minimum untuk data acak
   * @param {number} max - Nilai maksimum untuk data acak
   * @returns {Object} Dataset untuk grafik garis
   */
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

  /**
   * Membuat struktur data untuk grafik batang
   * @returns {ChartData<"bar", number[], string>} Data untuk grafik batang
   */
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

  /**
   * Inisialisasi data penyakit per tahun untuk setiap kecamatan
   * Generate data acak untuk setiap penyakit dan tahun
   */
  inisialisasiDataPertahun() {
    const jumlahKecamatan = this.daftarKecamatan.length || 33; // Default 33 jika belum ada data
    console.log('Jumlah kecamatan:', jumlahKecamatan);

    for (const tahun of this.tahunTersedia) {
      if (!this.dataPenyakitPertahun[tahun]) {
        this.dataPenyakitPertahun[tahun] = {
          diabetes: this.acakAngka(20, 70, jumlahKecamatan),
          kardiovaskular: this.acakAngka(15, 55, jumlahKecamatan),
          obesitas: this.acakAngka(25, 85, jumlahKecamatan),
          hipertensi: this.acakAngka(30, 110, jumlahKecamatan),
          kolesterol: this.acakAngka(20, 65, jumlahKecamatan),
        };
        console.log(`Data untuk tahun ${tahun}:`, this.dataPenyakitPertahun[tahun]);
      }
    }
    this.dataPenyakitAktif = this.dataPenyakitPertahun[this.tahunDipilih];
    console.log('Data penyakit aktif:', this.dataPenyakitAktif);
  }

  /**
   * Memperbarui data grafik batang berdasarkan penyakit yang dipilih
   * Jika penyakit = "total", hitung total semua penyakit
   */
  perbaruiGrafikBatang() {
    if (this.penyakitDipilih === "total") {
      // Hitung total penderita untuk setiap kecamatan
      const totalData = this.daftarKecamatan.map((_, index) => {
        return this.dataPenyakitAktif["diabetes"][index] +
               this.dataPenyakitAktif["kardiovaskular"][index] +
               this.dataPenyakitAktif["obesitas"][index] +
               this.dataPenyakitAktif["hipertensi"][index] +
               this.dataPenyakitAktif["kolesterol"][index];
      });
      this.dataGrafikBatang.datasets[0].data = totalData;
    } else {
      this.dataGrafikBatang.datasets[0].data = this.dataPenyakitAktif[this.penyakitDipilih] || [];
    }
  }

  /**
   * Memperbarui data grafik pie berdasarkan tahun yang dipilih
   * Menampilkan proporsi kasus penyakit tidak menular
   */
  perbaruiGrafikPie() {
    const tahunIni = this.dataPenyakitPertahun[this.tahunDipilih];
    if (!tahunIni) {
      console.warn('Data tahun tidak ditemukan:', this.tahunDipilih);
      return;
    }

    const dataPie = [
      tahunIni["diabetes"]?.reduce((a, b) => a + b, 0) || 0,
      tahunIni["kardiovaskular"]?.reduce((a, b) => a + b, 0) || 0,
      tahunIni["obesitas"]?.reduce((a, b) => a + b, 0) || 0,
      tahunIni["hipertensi"]?.reduce((a, b) => a + b, 0) || 0,
      tahunIni["kolesterol"]?.reduce((a, b) => a + b, 0) || 0,
    ];

    console.log('Data Pie Chart:', dataPie);

    // Pastikan ada data yang tidak nol
    if (dataPie.some(value => value > 0)) {
      this.dataGrafikLingkaran.datasets[0].data = dataPie;
    } else {
      // Jika semua data nol, berikan data dummy
      this.dataGrafikLingkaran.datasets[0].data = [100, 80, 120, 150, 90];
    }
  }

  /**
   * Memperbarui semua grafik (batang dan pie)
   */
  perbaruiSemuaGrafik() {
    console.log('Memperbarui semua grafik...');
    this.perbaruiGrafikBatang();
    this.perbaruiGrafikPie();
    console.log('Data pie chart setelah update:', this.dataGrafikLingkaran.datasets[0].data);
  }

  /**
   * Event handler ketika tahun berubah
   * Memperbarui data aktif dan semua grafik
   */
  ubahTahun() {
    this.dataPenyakitAktif = this.dataPenyakitPertahun[this.tahunDipilih];
    this.perbaruiSemuaGrafik();
    this.simpanKeLocalStorage();

    // Pastikan pie chart diperbarui dengan data tahun yang baru
    setTimeout(() => {
      this.perbaruiGrafikPie();
    }, 50);
  }

  /**
   * Event handler ketika penyakit berubah
   * Memperbarui semua grafik
   */
  ubahPenyakit() {
    this.perbaruiSemuaGrafik();
    this.simpanKeLocalStorage();

    // Pastikan pie chart diperbarui dengan data penyakit yang baru
    setTimeout(() => {
      this.perbaruiGrafikPie();
    }, 50);
  }

  /**
   * Menyimpan data ke localStorage untuk persistensi
   */
  simpanKeLocalStorage() {
    localStorage.setItem("dataDasbor", JSON.stringify({
      dataPenyakitPertahun: this.dataPenyakitPertahun,
      penyakitDipilih: this.penyakitDipilih,
      tahunDipilih: this.tahunDipilih,
    }));
  }

  /**
   * Mengambil data dari localStorage
   * Memulihkan state component dari penyimpanan lokal
   */
  ambilDataLokal() {
    const simpanan = localStorage.getItem("dataDasbor");
    if (simpanan) {
      const data = JSON.parse(simpanan);
      this.dataPenyakitPertahun = data.dataPenyakitPertahun || {};
      this.penyakitDipilih = data.penyakitDipilih || this.penyakitDipilih;
      this.tahunDipilih = data.tahunDipilih || this.tahunDipilih;
    }
  }

  /**
   * Validasi dan perbaiki data dari localStorage
   * Memastikan struktur data sesuai dengan format yang baru
   */
  validasiDanPerbaikiData() {
    const jumlahKecamatan = this.daftarKecamatan.length || 33;
    const penyakitYangDibutuhkan = ['diabetes', 'kardiovaskular', 'obesitas', 'hipertensi', 'kolesterol'];

    for (const tahun of this.tahunTersedia) {
      if (this.dataPenyakitPertahun[tahun]) {
        // Pastikan semua penyakit ada
        for (const penyakit of penyakitYangDibutuhkan) {
          if (!this.dataPenyakitPertahun[tahun][penyakit]) {
            this.dataPenyakitPertahun[tahun][penyakit] = this.acakAngka(20, 70, jumlahKecamatan);
          }
          // Pastikan jumlah data sesuai dengan jumlah kecamatan
          if (this.dataPenyakitPertahun[tahun][penyakit].length !== jumlahKecamatan) {
            this.dataPenyakitPertahun[tahun][penyakit] = this.acakAngka(20, 70, jumlahKecamatan);
          }
        }
      }
    }
  }

  /**
   * Event handler untuk membuka modal tambah data uji
   */
  bukaModalUji() {
    this.tampilkanModalUji = true;
  }

  /**
   * Event handler untuk menutup modal tambah data uji
   * Reset data form ke nilai default
   */
  tutupModalUji() {
    this.tampilkanModalUji = false;
    this.dataBaru = {
      kecamatan: "",
      penyakit: "diabetes",
      jumlah: 0,
      tahun: 2025,
    };
  }

  /**
   * Event handler untuk menambah data uji
   * Validasi input dan update data penyakit
   */
  tambahDataUji() {
    const indeks = this.daftarKecamatan.indexOf(this.dataBaru.kecamatan);
    if (indeks === -1 || this.dataBaru.jumlah <= 0) {
      alert("Isian tidak valid.");
      return;
    }

    const jumlahKecamatan = this.daftarKecamatan.length;
    if (!this.dataPenyakitPertahun[this.dataBaru.tahun]) {
      this.dataPenyakitPertahun[this.dataBaru.tahun] = {
        diabetes: Array(jumlahKecamatan).fill(0),
        kardiovaskular: Array(jumlahKecamatan).fill(0),
        obesitas: Array(jumlahKecamatan).fill(0),
        hipertensi: Array(jumlahKecamatan).fill(0),
        kolesterol: Array(jumlahKecamatan).fill(0),
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
