import { Injectable, ViewChild } from "@angular/core";
import { Gender } from "@enums/gender";
import { MedicalHistory } from "@enums/medical-history";

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

  // Nama variabel localStorage agar tidak hardcode dan mencegah mistyping.
  private static HEALTH_RECORD: string = "health-record";
  private static LIST_OF_ALLERGIES: string = "list-of-allergies";
  private static LIST_OF_FOODS: string = "list-of-foods";

  public static addAllergies(item: string[]): void {
    if (!item.every(Boolean)) {
      console.warn("Semua kolom pada kategori alergi harus diisi.");
      return;
    }

    this.daftar_alergi.push(item);
    localStorage.setItem(this.LIST_OF_ALLERGIES, JSON.stringify(this.daftar_alergi));
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
      localStorage.setItem(this.LIST_OF_FOODS, JSON.stringify(this.daftar_makanan));
    } catch (err: unknown) {
      console.error("Gagal menambahkan makanan ke dalam daftar karena kesalahan pada sistem.");
      throw err;
    }
  }

  /**
   * Memuat data daftar makanan dari localStorage ke dalam memori aplikasi.
   */
  public static loadFromLocalStorage(): void {
    if (localStorage.getItem(this.LIST_OF_ALLERGIES)) this.daftar_alergi = JSON.parse(localStorage.getItem(this.LIST_OF_ALLERGIES) as string);
    else if (localStorage.getItem(this.LIST_OF_FOODS)) this.daftar_makanan = JSON.parse(localStorage.getItem(this.LIST_OF_FOODS) as string);
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
    daftar_alergi: string[][];
    daftar_makanan: string[][];
  }): void {
    try {
      const record: typeof data = { ...data };
      localStorage.setItem(this.HEALTH_RECORD, JSON.stringify(record));
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