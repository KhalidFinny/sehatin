import { CommonModule } from "@angular/common";
import { Component, Input as InputCore, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Breadcrumb } from "@shared/breadcrumb/breadcrumb.component";
import { Header } from "@shared/header/header.component";
import { Input } from "@shared/input/input.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Select } from "@shared/select/select.component";

@Component({
  selector: "pages-tambah-rekap-kesehatan",
  standalone: true,
  imports: [Breadcrumb, CommonModule, FormsModule, Header, Input, MatTabsModule, RouterModule, Select, Sidebar],
  templateUrl: "./tambah-rekap-kesehatan.component.html",
  styleUrl: "./tambah-rekap-kesehatan.component.css",
})
export class TambahRekapKesehatan implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;

  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;
  private readonly nameLocalStorage = localStorage.setItem("data", JSON.stringify(this.submitData));

  @InputCore() usia: number | null = null;
  @InputCore() jenis_kelamin: "Laki-laki" | "Perempuan" | null = null;
  @InputCore() berat_badan: number | null = null;
  @InputCore() tinggi_badan: number | null = null;
  @InputCore() tingkat_aktivitas_fisik: string = "";
  @InputCore() tujuan_kesehatan: string = "";

  activityLevelOptions: Array<{ label: string; value: string }> = [
    { label: "Sedentari (minim aktivitas fisik)", value: "Sedentari (minim aktivitas fisik)" },
    { label: "Aktif Ringan (jalan kaki, dll)", value: "Aktif Ringan (jalan kaki, dll)" },
    { label: "Aktif Sedang (kerja fisik ringan)", value: "Aktif Sedang (kerja fisik ringan)" },
    { label: "Sangat Aktif (pekerja berat, atlet)", value: "Sangat Aktif (pekerja berat, atlet)" },
  ];

  genderOptions: Array<{ label: string; value: string }> = [
    { label: "Laki-laki", value: "Laki-laki" },
    { label: "Perempuan", value: "Perempuan" },
  ];

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Tambah Rekap Kesehatan | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
  }

  submitData(): void {
    try {
    } catch (err) {
      if (err instanceof Error) return console.warn(err.message);
      else return console.error(err);
      throw err;
    }
  }

  private validateForm() {}
}