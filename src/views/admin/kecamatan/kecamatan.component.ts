import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Sidebar } from '@shared/sidebar/sidebar.component';
import { getAllDistricts } from 'indonesia-nodejs';
import { Router } from '@angular/router';

// Fungsi hash string ke angka
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Fungsi random dengan seed
function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Interface untuk data kecamatan yang berisi informasi penderita PTM
 * @interface KecamatanData
 * @property {number} id - ID unik kecamatan
 * @property {string} nama - Nama kecamatan
 * @property {number} totalPenderita - Total penderita semua penyakit
 * @property {number} diabetes - Jumlah penderita diabetes
 * @property {number} kardiovaskular - Jumlah penderita kardiovaskular
 * @property {number} obesitas - Jumlah penderita obesitas
 * @property {number} hipertensi - Jumlah penderita hipertensi
 * @property {number} kolesterol - Jumlah penderita kolesterol
 */
interface KecamatanData {
  id: number;
  nama: string;
  totalPenderita: number;
  diabetes: number;
  kardiovaskular: number;
  obesitas: number;
  hipertensi: number;
  kolesterol: number;
}

/**
 * Component untuk menampilkan daftar kecamatan dengan data penderita PTM
 * Fitur utama:
 * - Menampilkan data kecamatan dalam bentuk tabel
 * - Filter berdasarkan jenis penyakit
 * - Sorting ascending/descending
 * - Export data ke Excel
 * - Detail kecamatan
 */
@Component({
  selector: 'app-kecamatan',
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './kecamatan.component.html',
  styleUrl: './kecamatan.component.css'
})
export class KecamatanComponent implements OnInit {
  /** Tanggal hari ini dalam format Indonesia */
  tanggalHariIni: string = '';
  /** Waktu sekarang dalam format Indonesia */
  waktuSekarang: string = '';

  /**
   * Constructor untuk inisialisasi component
   * @param title - Service untuk mengatur title halaman
   * @param meta - Service untuk mengatur meta tags
   */
  constructor(private title: Title, private meta: Meta, private router: Router) {
    this.title.setTitle("Daftar Kecamatan | SEHATIN");
    this.meta.addTags([
      { name: "description", content: "Daftar data penderita PTM per kecamatan" },
      { property: "og:title", content: "Daftar Kecamatan | SEHATIN" },
      { property: "og:description", content: "Daftar data penderita PTM per kecamatan" },
    ]);
  }

  /** Array berisi data kecamatan yang telah difilter */
  kecamatanList: KecamatanData[] = [];
  /** Total keseluruhan penderita dari semua kecamatan */
  totalKeseluruhan = 0;
  /** Status loading untuk menampilkan spinner */
  loading = true;
  /** Penyakit yang dipilih untuk filter (default: total) */
  penyakitDipilih = 'total';
  /** Urutan sorting (asc/desc) */
  sortOrder: 'asc' | 'desc' = 'desc';
  /** Array berisi data kecamatan yang telah difilter dan diurutkan */
  filteredKecamatanList: KecamatanData[] = [];

  /**
   * Daftar penyakit yang tersedia untuk filter
   * @type {Array<{label: string, value: string}>}
   */
  daftarPenyakit = [
    { label: 'Total Penderita', value: 'total' },
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Kardiovaskular', value: 'kardiovaskular' },
    { label: 'Obesitas', value: 'obesitas' },
    { label: 'Hipertensi', value: 'hipertensi' },
    { label: 'Kolesterol', value: 'kolesterol' },
  ];

  /**
   * Lifecycle hook yang dipanggil setelah component diinisialisasi
   * Mengatur tanggal/waktu dan memuat data kecamatan
   */
  ngOnInit(): void {
    this.updateDateTime();
    this.loadKecamatanData();
    // Update waktu setiap 1 menit
    setInterval(() => {
      this.updateDateTime();
    }, 60000);
  }

  /**
   * Memperbarui tanggal dan waktu saat ini
   * @private
   */
  private updateDateTime(): void {
    const now = new Date();
    this.tanggalHariIni = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    this.waktuSekarang = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Memuat data kecamatan dari library indonesia-nodejs
   * dan generate data dummy untuk setiap kecamatan
   * @private
   * @returns {Promise<void>}
   */
  private async loadKecamatanData(): Promise<void> {
    try {
      // Ambil data kecamatan dari indonesia-nodejs
      const allDistricts = await getAllDistricts();
      // Filter hanya kecamatan di Kabupaten Malang (city_code: 3507)
      const malangDistricts = allDistricts.filter(district => district.city_code === 3507);

      // Generate data dummy deterministik untuk setiap kecamatan
      this.kecamatanList = malangDistricts.map((district, index) => {
        const seed = hashString(district.name);
        // Gunakan seededRandom untuk setiap penyakit
        const diabetes = 20 + Math.floor(seededRandom(seed + 1) * 51); // 20-70
        const kardiovaskular = 15 + Math.floor(seededRandom(seed + 2) * 41); // 15-55
        const obesitas = 25 + Math.floor(seededRandom(seed + 3) * 61); // 25-85
        const hipertensi = 30 + Math.floor(seededRandom(seed + 4) * 81); // 30-110
        const kolesterol = 20 + Math.floor(seededRandom(seed + 5) * 46); // 20-65
        const totalPenderita = diabetes + kardiovaskular + obesitas + hipertensi + kolesterol;
        return {
          id: index + 1,
          nama: district.name,
          totalPenderita,
          diabetes,
          kardiovaskular,
          obesitas,
          hipertensi,
          kolesterol
        };
      });

      this.calculateTotalKeseluruhan();
      this.updateFilteredList();
      this.loading = false;
    } catch (error) {
      console.error('Error loading kecamatan data:', error);
      this.loading = false;
    }
  }

  /**
   * Menghitung total keseluruhan penderita dari semua kecamatan
   * @private
   */
  private calculateTotalKeseluruhan(): void {
    this.totalKeseluruhan = this.kecamatanList.reduce((total, kecamatan) => {
      return total + kecamatan.totalPenderita;
    }, 0);
  }

  /**
   * Event handler ketika penyakit yang dipilih berubah
   * Memperbarui list yang difilter
   */
  onPenyakitChange(): void {
    this.updateFilteredList();
  }

  /**
   * Toggle urutan sorting antara ascending dan descending
   * Memperbarui list yang difilter
   */
  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.updateFilteredList();
  }

  /**
   * Memperbarui list kecamatan yang difilter dan diurutkan
   * @private
   */
  updateFilteredList(): void {
    const penyakit = this.penyakitDipilih;
    let list = [...this.kecamatanList];

    // Filter berdasarkan penyakit yang dipilih (kecuali 'total')
    if (penyakit !== 'total') {
      list = list.filter(k => Number(k[penyakit as keyof KecamatanData]) > 0);
    }

    // Sort berdasarkan jumlah penderita
    list.sort((a, b) => {
      const valA = this.getJumlahPenderita(a);
      const valB = this.getJumlahPenderita(b);
      return this.sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    this.filteredKecamatanList = list;
  }

  /**
   * Mendapatkan jumlah penderita berdasarkan penyakit yang dipilih
   * @param {KecamatanData} kecamatan - Data kecamatan
   * @returns {number} Jumlah penderita
   */
  getJumlahPenderita(kecamatan: KecamatanData): number {
    if (this.penyakitDipilih === 'total') return kecamatan.totalPenderita;
    return kecamatan[this.penyakitDipilih as keyof KecamatanData] as number;
  }

  /**
   * Menghitung persentase dari suatu nilai terhadap total
   * @param {number} value - Nilai yang akan dihitung persentasenya
   * @param {number} total - Total keseluruhan
   * @returns {number} Persentase (0-100)
   */
  getPercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  /**
   * Event handler untuk melihat detail kecamatan
   * @param {KecamatanData} kecamatan - Data kecamatan yang dipilih
   */
  lihatDetail(kecamatan: KecamatanData): void {
    this.router.navigate(['/admin/kecamatan', kecamatan.id]);
  }

  /**
   * Mengunduh data kecamatan dalam format Excel (.xls)
   * Membuat file HTML table yang dapat dibuka di Excel
   */
  downloadExcel(): void {
    // Header dengan semua kolom
    const headers = [
      'No',
      'Kecamatan',
      'Total Penderita',
      'Diabetes',
      'Kardiovaskular',
      'Obesitas',
      'Hipertensi',
      'Kolesterol'
    ];

    // Data untuk setiap kecamatan
    const rows = this.filteredKecamatanList.map((kecamatan, index) => [
      (index + 1),
      kecamatan.nama,
      kecamatan.totalPenderita,
      kecamatan.diabetes,
      kecamatan.kardiovaskular,
      kecamatan.obesitas,
      kecamatan.hipertensi,
      kecamatan.kolesterol
    ]);

    // Tambahkan baris total di akhir
    const totalRow = [
      '',
      'TOTAL',
      this.filteredKecamatanList.reduce((sum, k) => sum + k.totalPenderita, 0),
      this.filteredKecamatanList.reduce((sum, k) => sum + k.diabetes, 0),
      this.filteredKecamatanList.reduce((sum, k) => sum + k.kardiovaskular, 0),
      this.filteredKecamatanList.reduce((sum, k) => sum + k.obesitas, 0),
      this.filteredKecamatanList.reduce((sum, k) => sum + k.hipertensi, 0),
      this.filteredKecamatanList.reduce((sum, k) => sum + k.kolesterol, 0)
    ];

    // Gabungkan semua data
    const allData = [headers, ...rows, totalRow];

    // Buat HTML table untuk Excel dengan styling yang rapi
    let htmlTable = '<table style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 11px; width: 100%;">';

    allData.forEach((row, rowIndex) => {
      htmlTable += '<tr>';
      row.forEach((cell, cellIndex) => {
        const isHeader = rowIndex === 0;
        const isTotal = rowIndex === allData.length - 1;
        const isNumber = typeof cell === 'number';

        let style = 'padding: 4px 6px; border: 1px solid #ddd; font-size: 11px;';
        if (isHeader) {
          style += 'background-color: #f8f9fa; font-weight: 600; text-align: center; color: #333;';
        } else if (isTotal) {
          style += 'background-color: #f0f8ff; font-weight: 600; color: #2c5aa0;';
        } else if (isNumber) {
          style += 'text-align: right; color: #333;';
        } else {
          style += 'text-align: left; color: #333;';
        }

        htmlTable += `<td style="${style}">${cell}</td>`;
      });
      htmlTable += '</tr>';
    });

    htmlTable += '</table>';

    // Buat HTML document lengkap dengan styling yang rapi
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Data Kecamatan</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 8px; }
            p { font-size: 11px; color: #666; margin: 2px 0; }
          </style>
        </head>
        <body>
          <h2>Data Penderita PTM per Kecamatan</h2>
          <p>Tanggal: ${new Date().toLocaleDateString('id-ID')}</p>
          <p>Filter: ${this.penyakitDipilih === 'total' ? 'Semua Penyakit' : this.daftarPenyakit.find(p => p.value === this.penyakitDipilih)?.label}</p>
          <br>
          ${htmlTable}
        </body>
      </html>
    `;

    // Buat dan download file
    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Nama file dengan timestamp
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const filterText = this.penyakitDipilih === 'total' ? 'Semua_Penyakit' : this.daftarPenyakit.find(p => p.value === this.penyakitDipilih)?.label?.replace(/\s+/g, '_') || 'Filtered';

    a.download = `data_kecamatan_${filterText}_${timestamp}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
