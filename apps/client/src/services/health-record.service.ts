import { Injectable, ViewChild } from "@angular/core";
import { Gender } from "@enums/gender";
import { MedicalHistory } from "@enums/medical-history";

@Injectable({ providedIn: "root" })
export class HealthRecord {
  /**
   * Menyimpan daftar makanan dalam array 2 dimensi.
   * Format: [[jenis_makanan, jumlah, frekuensi], ...]
   */
  public static daftarMakanan: string[][] = [];

  /**
   * Menambahkan makanan ke dalam daftar dan menyimpannya ke localStorage.
   * @param item Array berisi jenis, jumlah, dan frekuensi makanan.
   */
  public static addFoods(item: string[]): void {
    try {
      if (!item.every(Boolean)) {
        console.warn("Semua kolom pada kategori makanan harus diisi.");
        return;
      }

      this.daftarMakanan.push(item);
      localStorage.setItem("list-of-foods", JSON.stringify(this.daftarMakanan));
    } catch (err) {
      console.error("Gagal menambahkan makanan ke dalam daftar karena kesalahan pada sistem.");
      throw err;
    }
  }

  /**
   * Memuat data daftar makanan dari localStorage ke dalam memori aplikasi.
   */
  public static loadFromLocalStorage(): void {
    const data = localStorage.getItem("list-of-foods");
    if (data) this.daftarMakanan = JSON.parse(data);
  }

  public static create(data: {
    usia: number | null;
    jenis_kelamin: Gender | null;
    berat_badan: number | null;
    tinggi_badan: number | null;
    tingkat_aktivitas_fisik: string;
    tujuan_kesehatan: string;
    jenis_makanan: string;
    jumlah_atau_porsi: string;
    frekuensi_konsumsi: string;
    kondisi_kesehatan: MedicalHistory | null;
    tanggal_diagnosis: Date | null;
    pengobatan_saat_ini: string;
    kondisi_khusus: string;
    jenis_alergi: string;
    tingkat_keparahan: string;
    riwayat_reaksi_alergi: string;
    kebiasaan_olah_raga: string;
    pola_tidur: string;
    kebiasaan_lain: string[];
    daftarAlergi: string[][];
    daftarMakanan: string[][];
  }): void {
    try {
      const record: typeof data = { ...data };
      localStorage.setItem("health-record", JSON.stringify(record));
    } catch (err) {
      console.error("Gagal menambahkan rekap kesehatan karena kesalahan pada sistem.");
      throw err;
    }
  }

  public static read() {
    try {
    } catch (err) {
      console.error("Gagal mendapatkan data rekap kesehatan karena kesalahan pada sistem.");
      throw err;
    }
  }
}