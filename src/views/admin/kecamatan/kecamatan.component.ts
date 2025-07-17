import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Sidebar } from '@shared/sidebar/sidebar.component';

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

@Component({
  selector: 'app-kecamatan',
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './kecamatan.component.html',
  styleUrl: './kecamatan.component.css'
})
export class KecamatanComponent implements OnInit {
  tanggalHariIni: string = '';
  waktuSekarang: string = '';

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle("Daftar Kecamatan | SEHATIN");
    this.meta.addTags([
      { name: "description", content: "Daftar data penderita PTM per kecamatan" },
      { property: "og:title", content: "Daftar Kecamatan | SEHATIN" },
      { property: "og:description", content: "Daftar data penderita PTM per kecamatan" },
    ]);
  }

  kecamatanList: KecamatanData[] = [];
  totalKeseluruhan = 0;
  loading = true;
  penyakitDipilih = 'total';
  sortOrder: 'asc' | 'desc' = 'desc';
  filteredKecamatanList: KecamatanData[] = [];

  daftarPenyakit = [
    { label: 'Total Penderita', value: 'total' },
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Kardiovaskular', value: 'kardiovaskular' },
    { label: 'Obesitas', value: 'obesitas' },
    { label: 'Hipertensi', value: 'hipertensi' },
    { label: 'Kolesterol', value: 'kolesterol' },
  ];

  ngOnInit(): void {
    this.updateDateTime();
    this.loadKecamatanData();
    setInterval(() => {
      this.updateDateTime();
    }, 60000);
  }

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

  private loadKecamatanData(): void {
    this.kecamatanList = [
      { id: 1, nama: 'Ampelgading', totalPenderita: 245, diabetes: 45, kardiovaskular:38, obesitas: 52, hipertensi: 67, kolesterol: 43 },
      { id: 2, nama: 'Bantur', totalPenderita: 189, diabetes: 32, kardiovaskular:29, obesitas: 41, hipertensi: 54, kolesterol: 33 },
      { id:3, nama: 'Bululawang', totalPenderita: 312, diabetes: 58, kardiovaskular:47, obesitas: 68, hipertensi: 89, kolesterol: 50 },
      { id: 4, nama: 'Dampit', totalPenderita: 276, diabetes: 51, kardiovaskular:42, obesitas: 59, hipertensi: 76, kolesterol: 48 },
      { id: 5, nama: 'Dau', totalPenderita: 298, diabetes: 55, kardiovaskular:45, obesitas: 63, hipertensi: 82, kolesterol: 53 },
      { id: 6, nama: 'Donomulyo', totalPenderita: 167, diabetes: 28, kardiovaskular:25, obesitas: 36, hipertensi: 48, kolesterol: 30 },
      { id: 7, nama: 'Gedangan', totalPenderita: 234, diabetes: 43, kardiovaskular:35, obesitas: 49, hipertensi: 65, kolesterol: 42 },
      { id:8, nama: 'Gondanglegi', totalPenderita: 289, diabetes: 53, kardiovaskular:44, obesitas: 61, hipertensi: 79, kolesterol: 52 },
      { id: 9, nama: 'Jabung', totalPenderita: 201, diabetes: 37, kardiovaskular:31, obesitas: 44, hipertensi: 58, kolesterol: 31 },
      { id: 10, nama: 'Kalipare', totalPenderita: 178, diabetes: 31, kardiovaskular:27, obesitas: 38, hipertensi: 51, kolesterol: 31 },
      { id:11, nama: 'Karangploso', totalPenderita: 256, diabetes: 47, kardiovaskular:39, obesitas: 55, hipertensi: 71, kolesterol: 44 },
      { id:12, nama: 'Kasembon', totalPenderita: 145, diabetes: 26, kardiovaskular:22, obesitas: 31, hipertensi: 42, kolesterol: 24 },
      { id: 13, nama: 'Kepanjen', totalPenderita: 345, diabetes: 64, kardiovaskular:52, obesitas: 74, hipertensi: 95, kolesterol: 60 },
      { id: 14, nama: 'Kromengan', totalPenderita: 198, diabetes: 36, kardiovaskular:30, obesitas: 43, hipertensi: 57, kolesterol: 32 },
      { id:15, nama: 'Lawang', totalPenderita: 267, diabetes: 49, kardiovaskular:40, obesitas: 57, hipertensi: 73, kolesterol: 48 },
      { id:16, nama: 'Ngajum', totalPenderita: 223, diabetes: 41, kardiovaskular:33, obesitas: 47, hipertensi: 62, kolesterol: 40 },
      { id: 17, nama: 'Ngantang', totalPenderita: 189, diabetes: 34, kardiovaskular:28, obesitas: 40, hipertensi: 54, kolesterol: 33 },
      { id: 18, nama: 'Pagak', totalPenderita: 156, diabetes: 28, kardiovaskular:24, obesitas: 34, hipertensi: 46, kolesterol: 24 },
      { id: 19, nama: 'Pagelaran', totalPenderita: 212, diabetes: 39, kardiovaskular:32, obesitas: 45, hipertensi: 60, kolesterol: 36 },
      { id: 20, nama: 'Pakis', totalPenderita: 278, diabetes: 51, kardiovaskular:42, obesitas: 59, hipertensi: 76, kolesterol: 50 },
      { id: 21, nama: 'Pakisaji', totalPenderita: 245, diabetes: 45, kardiovaskular:37, obesitas: 52, hipertensi: 68, kolesterol: 43 },
      { id: 22, nama: 'Poncokusumo', totalPenderita: 167, diabetes: 30, kardiovaskular:25, obesitas: 36, hipertensi: 48, kolesterol: 28 },
      { id: 23, nama: 'Pujon', totalPenderita: 134, diabetes: 24, kardiovaskular:20, obesitas: 29, hipertensi: 39, kolesterol: 22 },
      { id:24, nama: 'Sumbermanjing Wetan', totalPenderita: 189, diabetes: 34, kardiovaskular:28, obesitas: 40, hipertensi: 54, kolesterol: 33 },
      { id:25, nama: 'Singosari', totalPenderita: 312, diabetes: 58, kardiovaskular:47, obesitas: 68, hipertensi: 89, kolesterol: 50 },
      { id: 26, nama: 'Sumberpucung', totalPenderita: 201, diabetes: 37, kardiovaskular:31, obesitas: 44, hipertensi: 58, kolesterol: 31 },
      { id: 27, nama: 'Tajinan', totalPenderita: 234, diabetes: 43, kardiovaskular:35, obesitas: 49, hipertensi: 65, kolesterol: 42 },
      { id:28, nama: 'Tirtoyudo', totalPenderita: 178, diabetes: 32, kardiovaskular:27, obesitas: 38, hipertensi: 51, kolesterol: 30 },
      { id: 29, nama: 'Tumpang', totalPenderita: 245, diabetes: 45, kardiovaskular:37, obesitas: 52, hipertensi: 68, kolesterol: 43 },
      { id: 30, nama: 'Turen', totalPenderita: 267, diabetes: 49, kardiovaskular:40, obesitas: 57, hipertensi: 73, kolesterol: 48 },
      { id: 31, nama: 'Wagir', totalPenderita: 198, diabetes: 36, kardiovaskular:30, obesitas: 43, hipertensi: 57, kolesterol: 32 },
      { id: 32, nama: 'Wajak', totalPenderita: 223, diabetes: 41, kardiovaskular:33, obesitas: 47, hipertensi: 62, kolesterol: 40 },
      { id: 33, nama: 'Wonosari', totalPenderita: 156, diabetes: 28, kardiovaskular:24, obesitas: 34, hipertensi: 46, kolesterol: 24 }
    ];
    this.calculateTotalKeseluruhan();
    this.updateFilteredList();
    this.loading = false;
  }

  private calculateTotalKeseluruhan(): void {
    this.totalKeseluruhan = this.kecamatanList.reduce((total, kecamatan) => {
      return total + kecamatan.totalPenderita;
    }, 0);
  }

  onPenyakitChange(): void {
    this.updateFilteredList();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.updateFilteredList();
  }

  updateFilteredList(): void {
    const penyakit = this.penyakitDipilih;
    let list = [...this.kecamatanList];
    if (penyakit !== 'total') {
      list = list.filter(k => Number(k[penyakit as keyof KecamatanData]) > 0);
    }
    list.sort((a, b) => {
      const valA = this.getJumlahPenderita(a);
      const valB = this.getJumlahPenderita(b);
      return this.sortOrder === 'asc' ? valA - valB : valB - valA;
    });
    this.filteredKecamatanList = list;
  }

  getJumlahPenderita(kecamatan: KecamatanData): number {
    if (this.penyakitDipilih === 'total') return kecamatan.totalPenderita;
    return kecamatan[this.penyakitDipilih as keyof KecamatanData] as number;
  }

  getPercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  lihatDetail(kecamatan: KecamatanData): void {
    alert('Detail kecamatan: ' + kecamatan.nama);
  }

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
