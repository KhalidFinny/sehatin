import { CommonModule } from "@angular/common";
import { Component, Input as InputCore, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { Meta, Title } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { ActivityLevel } from "@enums/activity-level";
import { HealthGoal } from "@enums/health-goal";
import { Gender } from "@enums/gender";
import { KindOfAllergies } from "@enums/kind-of-allergies";
import { MedicalHistory } from "@enums/medical-history";
import { SeverityOfAllergy } from "@enums/severity-of-allergy";
import { BasePage } from "@helpers/base-page";
import { EnumOptions } from "@helpers/enum-options";
import { SidebarService } from "@services/sidebar.service";
import { HealthRecordService } from "@services/health-record.service";
import { Breadcrumb } from "@shared/breadcrumb/breadcrumb.component";
import { Checkbox } from "@shared/checkbox/checkbox.component";
import { Header } from "@shared/header/header.component";
import { Input } from "@shared/input/input.component";
import { Select } from "@shared/select/select.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Table } from "@shared/table/table.component";
import { Textarea } from "@shared/textarea/textarea.component";

@Component({
  selector: "pages-tambah-rekap-kesehatan",
  standalone: true,
  imports: [Breadcrumb, Checkbox, CommonModule, FormsModule, Header, Input, MatTabsModule, RouterModule, Select, Sidebar, Table, Textarea],
  templateUrl: "./tambah-rekap-kesehatan.component.html",
  styleUrl: "./tambah-rekap-kesehatan.component.css",
})
export class TambahRekapKesehatan implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;

  // Array yang akan di-inject ke dalam form dan diisi oleh enum.
  public activityLevelOptions: Array<{ label: string; value: string }> = [];
  public genderOptions: Array<{ label: string; value: string }> = [];
  public healthGoal: Array<{ label: string; value: string }> = [];
  public kindOfAllergies: Array<{ label: string; value: string }> = [];
  public listOfDiseases: Array<{ label: string; value: string }> = [];
  public severityOfAllergies: Array<{ label: string; value: string }> = [];

  // Array dua dimensi yang nantinya akan jadi nested value.
  public daftar_alergi: string[][] = [];
  public daftar_makanan: string[][] = [];

  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  // Input untuk profil.
  @InputCore() usia: number | null = null;
  @InputCore() jenis_kelamin: Gender | null = null;
  @InputCore() berat_badan: number | null = null;
  @InputCore() tinggi_badan: number | null = null;
  @InputCore() tingkat_aktivitas_fisik: string = "";
  @InputCore() tujuan_kesehatan: string = "";

  // Input untuk makanan.
  @InputCore() jenis_makanan: string = "";
  @InputCore() jumlah_atau_porsi: string = "";
  @InputCore() frekuensi_konsumsi: string = "";

  // Input untuk penyakit.
  @InputCore() kondisi_kesehatan: MedicalHistory | null = null;
  @InputCore() tanggal_diagnosis: Date | null = null;
  @InputCore() pengobatan_saat_ini: string = "";
  @InputCore() kondisi_khusus: string = "";

  // Input untuk alergi.
  @InputCore() jenis_alergi: string = "";
  @InputCore() tingkat_keparahan: string = "";
  @InputCore() riwayat_reaksi_alergi: string = "";

  // Input untuk gaya hidup.
  @InputCore() kebiasaan_olah_raga: string = ""
  @InputCore() pola_tidur: string = "";
  @InputCore() kebiasaan_lain: string[] = [];

  constructor(private sidebarService: SidebarService, private router: Router, private healthRecordService: HealthRecordService, public title: Title, public meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Tambah Rekap Kesehatan | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // Menginjeksi enum ke dropdown.
    this.activityLevelOptions = EnumOptions.fromEnum(ActivityLevel);
    this.healthGoal = EnumOptions.fromEnum(HealthGoal);
    this.kindOfAllergies = EnumOptions.fromEnum(KindOfAllergies);
    this.listOfDiseases = EnumOptions.fromEnum(MedicalHistory);
    this.genderOptions = EnumOptions.fromEnum(Gender);
    this.severityOfAllergies = EnumOptions.fromEnum(SeverityOfAllergy);

    // Logika sidebar agar menyesuaikan dengan tampilan.
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => {
      this.isSidebarOpen = state;
    });

    // Mengambil data makanan dari localStorage()
    this.healthRecordService.loadFromLocalStorage();
    this.daftar_makanan = this.healthRecordService.daftar_makanan;
  }

  /**
   * Getter untuk merender daftar makanan dalam bentuk array dengan index numerik di awal.
   * Contoh output: [1, "Nasi", "2 porsi", "Makan Siang"]
   */
  public get rowsOfFood(): [number, ...string[]][] {
    return this.daftar_makanan.map((row, i) => [i + 1, ...row]);
  }

  public get rowsOfAllergies(): [number, ...string[]][] {
    return this.daftar_alergi.map((row, i) => [i + 1, ...row]);
  }

  public addAllergyToTheList() {
    if (!this.jenis_alergi || !this.tingkat_keparahan || !this.riwayat_reaksi_alergi) {
      console.warn("Semua bidang harus diisi.");
      return;
    }

    // Add to service
    this.healthRecordService.addAllergies([this.jenis_alergi, this.tingkat_keparahan, this.riwayat_reaksi_alergi]);

    // Update local array
    this.daftar_alergi = this.healthRecordService.daftar_alergi;

    // Reset fields
    this.jenis_alergi = "";
    this.tingkat_keparahan = "";
    this.riwayat_reaksi_alergi = "";
  }

  /**
   * Menambahkan makanan ke dalam daftar.
   * Memastikan semua field sudah diisi, menyimpan ke service, update localStorage, dan reset form input.
   */
  public addFoodToTheList() {
    if (!this.jenis_makanan || !this.jumlah_atau_porsi || !this.frekuensi_konsumsi) {
      console.warn("Semua bidang harus diisi.");
      return;
    }

    // Add to service
    this.healthRecordService.addFoods([this.jenis_makanan, this.jumlah_atau_porsi, this.frekuensi_konsumsi]);

    // Update local array
    this.daftar_makanan = this.healthRecordService.daftar_makanan;

    // Reset fields
    this.jenis_makanan = "";
    this.jumlah_atau_porsi = "";
    this.frekuensi_konsumsi = "";
  }

  public createHealthRecordData(): Promise<boolean> {
    const penyakitSudahDiisi = this.kondisi_kesehatan !== null || this.tanggal_diagnosis !== null || this.pengobatan_saat_ini.trim() !== "" || this.kondisi_khusus.trim() !== "";

    this.healthRecordService.create({
      usia: this.usia,
      jenis_kelamin: this.jenis_kelamin,
      berat_badan: this.berat_badan,
      tinggi_badan: this.tinggi_badan,
      tingkat_aktivitas_fisik: this.tingkat_aktivitas_fisik,
      tujuan_kesehatan: this.tujuan_kesehatan,
      kondisi_kesehatan: penyakitSudahDiisi ? this.kondisi_kesehatan : null,
      tanggal_diagnosis: penyakitSudahDiisi ? this.tanggal_diagnosis : null,
      pengobatan_saat_ini: penyakitSudahDiisi ? this.pengobatan_saat_ini.trim() : "",
      kondisi_khusus: penyakitSudahDiisi ? this.kondisi_khusus.trim() : "",
      kebiasaan_olah_raga: this.kebiasaan_olah_raga,
      pola_tidur: this.pola_tidur,
      kebiasaan_lain: this.kebiasaan_lain,
      daftar_alergi: this.daftar_alergi,
      daftar_makanan: this.daftar_makanan,
    });

    return this.router.navigate(["/pengguna/rekap-kesehatan"]);
  }
}