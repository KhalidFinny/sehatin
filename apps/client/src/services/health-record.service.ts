import { Injectable } from "@angular/core";
import { HEALTH_RECORD, LIST_OF_ALLERGIES, LIST_OF_FOODS } from "@constants/local-storage-keys";
import { Gender } from "@enums/gender";
import { MedicalHistory } from "@enums/medical-history";

export type HealthRecordData = {
  usia: number | null;
  jenis_kelamin: Gender | null;
  berat_badan: number | null;
  tinggi_badan: number | null;
  tingkat_aktivitas_fisik: string;
  tujuan_kesehatan: string;
  kondisi_kesehatan: MedicalHistory | null;
  tanggal_diagnosis: Date | null;
  pengobatan_saat_ini: string;
  kondisi_khusus: string;
  kebiasaan_olah_raga: string;
  pola_tidur: string;
  kebiasaan_lain: string[];
  daftar_alergi: string[][];
  daftar_makanan: string[][];
};

export type HealthRecordTable = Pick<HealthRecordData, "usia" | "berat_badan" | "tinggi_badan" | "tingkat_aktivitas_fisik" | "pola_tidur">

@Injectable({ providedIn: "root" })
export class HealthRecord {
  /**
   * Menyimpan daftar alergi dalam array 2 dimensi.
   * Format: [[jenis_alergi, tingkat_keparahan, riwayat_reaksi_alergi], ...]
   */
  public static daftar_alergi: string[][] = [];

  /**
   * Menyimpan daftar makanan dalam array 2 dimensi.
   * Format: [[jenis_makanan, jumlah, frekuensi], ...]
   */
  public static daftar_makanan: string[][] = [];

  public static addAllergies(item: string[]): void {
    if (!item.every(Boolean)) {
      console.warn("Semua kolom pada kategori alergi harus diisi.");
      return;
    }

    this.daftar_alergi.push(item);
    localStorage.setItem(LIST_OF_ALLERGIES, JSON.stringify(this.daftar_alergi));
  } catch (err: unknown) {
    console.error("Gagal menambahkan alergi ke dalam daftar karena kesalahan pada sistem.");
    throw err;
  }

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

      this.daftar_makanan.push(item);
      localStorage.setItem(LIST_OF_FOODS, JSON.stringify(this.daftar_makanan));
    } catch (err: unknown) {
      console.error("Gagal menambahkan makanan ke dalam daftar karena kesalahan pada sistem.");
      throw err;
    }
  }

  /**
   * Memuat data daftar makanan dari localStorage ke dalam memori aplikasi.
   */
  public static loadFromLocalStorage(): void {
    if (localStorage.getItem(LIST_OF_ALLERGIES)) this.daftar_alergi = JSON.parse(localStorage.getItem(LIST_OF_ALLERGIES) as string);
    else if (localStorage.getItem(LIST_OF_FOODS)) this.daftar_makanan = JSON.parse(localStorage.getItem(LIST_OF_FOODS) as string);
  }

  public static create(data: HealthRecordData): void {
    try {
      const records = JSON.parse(localStorage.getItem(HEALTH_RECORD) || "[]");
      records.push(data);
      localStorage.setItem(HEALTH_RECORD, JSON.stringify(records));
    } catch (err) {
      console.error("Gagal menambahkan rekap kesehatan karena kesalahan pada sistem.");
      throw err;
    }
  }

  public static getAll(): unknown[] {
    try {
      return JSON.parse(localStorage.getItem(HEALTH_RECORD) || "[]");
    } catch (err: unknown) {
      console.error("Gagal menambahkan rekap kesehatan karena kesalahan pada sistem.");
      return [];
    }
  }

  public static readDetail() {
    try {
    } catch (err) {
      console.error("Gagal mendapatkan data rekap kesehatan karena kesalahan pada sistem.");
      throw err;
    }
  }
}