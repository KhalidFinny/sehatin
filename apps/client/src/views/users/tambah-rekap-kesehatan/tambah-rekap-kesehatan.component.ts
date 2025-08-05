import { CommonModule } from "@angular/common";
import { Component, Input as InputCore, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { ActivityLevel } from "@enums/activity-level";
import { HealthGoal } from "@enums/health-goal";
import { Gender } from "@enums/gender";
import { KindOfAllergies } from "@enums/kind-of-allergies";
import { MedicalHistory } from "@enums/medical-history";
import { SeverityOfAllergy } from "@enums/severity-of-allergy";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Breadcrumb } from "@shared/breadcrumb/breadcrumb.component";
import { Checkbox } from "@shared/checkbox/checkbox.component";
import { Header } from "@shared/header/header.component";
import { Input } from "@shared/input/input.component";
import { Select } from "@shared/select/select.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Table } from "@shared/table/table.component";
import { Textarea } from "@shared/textarea/textarea.component";
import { EnumOptions } from "@helpers/enum-options";

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
  public listOfAllergies: string[][] = [[]];
  public listOfFoods: string[][] = [[]];

  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  // Inisialisasi untuk ngModel.
  @InputCore() usia: number | null = null;
  @InputCore() jenis_kelamin: Gender | null = null;
  @InputCore() berat_badan: number | null = null;
  @InputCore() tinggi_badan: number | null = null;
  @InputCore() tingkat_aktivitas_fisik: string = "";
  @InputCore() tujuan_kesehatan: string = "";
  @InputCore() jenis_makanan: string = "";
  @InputCore() jumlah: string = "";
  @InputCore() frekuensi_konsumsi: string = "";
  @InputCore() kondisi_kesehatan: MedicalHistory | null = null;
  @InputCore() tanggal_diagnosis: Date | null = null;
  @InputCore() pengobatan_saat_ini: string = "";
  @InputCore() kondisi_khusus: string = "";
  @InputCore() jenis_alergi: string = "";
  @InputCore() tingkat_keparahan: string = "";
  @InputCore() riwayat_reaksi_alergi: string = "";
  @InputCore() kebiasaan_olah_raga: string = ""
  @InputCore() pola_tidur: string = "";
  @InputCore() kebiasaan_lain: string[] = [];

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Tambah Rekap Kesehatan | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.activityLevelOptions = EnumOptions.fromEnum(ActivityLevel);
    this.healthGoal = EnumOptions.fromEnum(HealthGoal);
    this.kindOfAllergies = EnumOptions.fromEnum(KindOfAllergies);
    this.listOfDiseases = EnumOptions.fromEnum(MedicalHistory);
    this.genderOptions = EnumOptions.fromEnum(Gender);
    this.severityOfAllergies = EnumOptions.fromEnum(SeverityOfAllergy);

    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => {
      return this.isSidebarOpen = state;
    });
  }

  submitData(): void {
    try {
      this.validateForm();
      localStorage.setItem("data", JSON.stringify({
        usia: this.usia,
        jenis_kelamin: this.jenis_kelamin,
        berat_badan: this.berat_badan,
        tinggi_badan: this.tinggi_badan,
        tingkat_aktivitas_fisik: this.tingkat_aktivitas_fisik,
        tujuan_kesehatan: this.tujuan_kesehatan,
        jenis_makanan: this.jenis_makanan,
        jumlah: this.jumlah,
        frekuensi_konsumsi: this.frekuensi_konsumsi,
        kondisi_kesehatan: this.kondisi_kesehatan,
        tanggal_diagnosis: this.tanggal_diagnosis,
        pengobatan_saat_ini: this.pengobatan_saat_ini,
        kondisi_khusus: this.kondisi_khusus,
      }));
    } catch (err) {
      console.error(`Terjadi kesalahan saat menambah rekap kesehatan Anda: ${err}`);
      throw err;
    }
  }

  private validateForm() {}
}