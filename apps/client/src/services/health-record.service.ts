// apps\client\src\services\health-record.service.ts

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

export type HealthRecordTable = Pick<
  HealthRecordData,
  "usia" | "berat_badan" | "tinggi_badan" | "tingkat_aktivitas_fisik" | "pola_tidur"
>;

@Injectable({ providedIn: "root" })
export class HealthRecordService {
  public daftar_alergi: string[][] = [];
  public daftar_makanan: string[][] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  public addAllergies(item: string[]): void {
    if (!item.every(Boolean)) {
      console.warn("Semua kolom pada kategori alergi harus diisi.");
      return;
    }

    this.daftar_alergi.push(item);
    localStorage.setItem(LIST_OF_ALLERGIES, JSON.stringify(this.daftar_alergi));
  }

  public addFoods(item: string[]): void {
    if (!item.every(Boolean)) {
      console.warn("Semua kolom pada kategori makanan harus diisi.");
      return;
    }

    this.daftar_makanan.push(item);
    localStorage.setItem(LIST_OF_FOODS, JSON.stringify(this.daftar_makanan));
  }

  public loadFromLocalStorage(): void {
    const alergiData = localStorage.getItem(LIST_OF_ALLERGIES);
    const makananData = localStorage.getItem(LIST_OF_FOODS);

    this.daftar_alergi = alergiData ? JSON.parse(alergiData) : [];
    this.daftar_makanan = makananData ? JSON.parse(makananData) : [];
  }

  public create(data: HealthRecordData): void {
    try {
      const records = JSON.parse(localStorage.getItem(HEALTH_RECORD) || "[]");
      records.push(data);
      localStorage.setItem(HEALTH_RECORD, JSON.stringify(records));
    } catch (err) {
      console.error("Gagal menambahkan rekap kesehatan karena kesalahan pada sistem.");
      throw err;
    }
  }

  public getAll(): HealthRecordData[] {
    try {
      return JSON.parse(localStorage.getItem(HEALTH_RECORD) || "[]");
    } catch (err) {
      console.error("Gagal mendapatkan rekap kesehatan karena kesalahan pada sistem.");
      return [];
    }
  }

  public readDetail(): void {
    try {
    } catch (err) {
      console.error("Gagal mendapatkan data rekap kesehatan karena kesalahan pada sistem.");
      throw err;
    }
  }
}