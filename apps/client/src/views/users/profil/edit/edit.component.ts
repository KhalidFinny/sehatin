import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";

export interface ProfilUser {
  nama: string;
  email: string;
  jenisKelamin: string;
  tanggalLahir: string;
  beratBadan: number;
  tinggiBadan: number;
  kelompokUsia: string;
}

@Component({
  selector: "pages-edit-profil-pengguna",
  imports: [CommonModule, FormsModule, RouterModule, Header, Sidebar],
  templateUrl: "./edit.component.html",
  standalone: true,
  styleUrl: "./edit.component.css",
})
export class EditComponent implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;
  public profil: ProfilUser = {
    nama: "User Sehatin",
    email: "user@sehatin.com",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1995-08-15",
    beratBadan: 65,
    tinggiBadan: 170,
    kelompokUsia: "Dewasa"
  };

  private sidebarSubscription!: Subscription;
  private pageAttributes: BasePage;

  constructor(
    title: Title,
    meta: Meta,
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Edit Profil | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe(
      (state) => (this.isSidebarOpen = state)
    );
  }

  public simpanProfil(): void {
    // Simulasi penyimpanan data
    console.log("Data profil disimpan:", this.profil);

    // Auto redirect ke halaman profil setelah simpan
    setTimeout(() => {
      this.router.navigate(['/pengguna/profil']);
    }, 1000);
  }

  public updateKelompokUsia(): void {
    if (this.profil.tanggalLahir) {
      const usia = this.hitungUsia();
      this.profil.kelompokUsia = this.tentukanKelompokUsia(usia);
    }
  }

  private hitungUsia(): number {
    const tanggalLahir = new Date(this.profil.tanggalLahir);
    const hariIni = new Date();
    let usia = hariIni.getFullYear() - tanggalLahir.getFullYear();
    const bulanIni = hariIni.getMonth();
    const bulanLahir = tanggalLahir.getMonth();

    if (bulanIni < bulanLahir || (bulanIni === bulanLahir && hariIni.getDate() < tanggalLahir.getDate())) {
      usia--;
    }

    return usia;
  }

  private tentukanKelompokUsia(usia: number): string {
    if (usia < 5) return "Balita";
    if (usia < 12) return "Anak-anak";
    if (usia < 18) return "Remaja";
    if (usia < 60) return "Dewasa";
    return "Lansia";
  }
}
