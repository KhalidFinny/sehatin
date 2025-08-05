import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Header } from "@shared/header/header.component";
import { getAllDistricts } from "indonesia-nodejs";
import { Router } from "@angular/router";
import { BasePage } from "@helpers/base-page";
import * as XLSX from "xlsx";
import { SidebarService } from "@services/sidebar.service";
import { Subscription } from "rxjs";

type DataKecamatan = {
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
  selector: "pages-analitik-kecamatan",
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Sidebar],
  templateUrl: "./analitik-kecamatan.component.html",
  styleUrl: "./analitik-kecamatan.component.css",
})
export class AnalitikKecamatan implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  tanggalHariIni = "";
  waktuSekarang = "";
  kecamatanList: DataKecamatan[] = [];
  filteredKecamatanList: DataKecamatan[] = [];
  penyakitDipilih = "total";
  jenisSortir: "asc" | "desc" = "desc";
  loading = true;

  readonly daftarPenyakit = [
    { label: "Total Penderita", value: "total" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Kardiovaskular", value: "kardiovaskular" },
    { label: "Obesitas", value: "obesitas" },
    { label: "Hipertensi", value: "hipertensi" },
    { label: "Kolesterol", value: "kolesterol" },
  ];

  constructor(public title: Title, public meta: Meta, public sidebarService: SidebarService, private router: Router) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Analitik Kecamatan | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
    this.updateDateTime();
    this.loadKecamatanData();
    setInterval(() => this.updateDateTime(), 60000);
  }

  private updateDateTime(): void {
    const now = new Date();

    this.tanggalHariIni = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    this.waktuSekarang = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private async loadKecamatanData(): Promise<void> {
    try {
      const allDistricts = await getAllDistricts();
      const malangDistricts = allDistricts.filter((d) => d.city_code === 3507);

      this.kecamatanList = malangDistricts.map((d, i) => {
        const s = Math.abs([...d.name].reduce((h, c) => (h << 5) - h + c.charCodeAt(0), 0));
        const diabetes = this.seeded(s + 1, 20, 70);
        const kardiovaskular = this.seeded(s + 2, 15, 55);
        const obesitas = this.seeded(s + 3, 25, 85);
        const hipertensi = this.seeded(s + 4, 30, 110);
        const kolesterol = this.seeded(s + 5, 20, 65);
        const totalPenderita = diabetes + kardiovaskular + obesitas + hipertensi + kolesterol;
        return { id: i + 1, nama: d.name, totalPenderita, diabetes, kardiovaskular, obesitas, hipertensi, kolesterol };
      });

      this.updateFilteredList();
    } catch (error) {
      console.error(`Gagal memuat data: ${error}`);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  private seeded(seed: number, min: number, max: number): number {
    const rand = Math.sin(seed) * 10000;
    return min + Math.floor((rand - Math.floor(rand)) * (max - min + 1));
  }

  onPenyakitChange(): void {
    this.updateFilteredList();
  }

  toggleSortOrder(): void {
    this.jenisSortir = this.jenisSortir === "asc" ? "desc" : "asc";
    this.updateFilteredList();
  }

  updateFilteredList(): void {
    const field = this.penyakitDipilih === "total" ? "totalPenderita" : this.penyakitDipilih;
    const sorted = [...this.kecamatanList].filter((k) => Number(k[field as keyof DataKecamatan]) > 0).sort((a, b) =>
      this.jenisSortir === "asc" ? (a[field as keyof DataKecamatan] as number) - (b[field as keyof DataKecamatan] as number) : (b[field as keyof DataKecamatan] as number) - (a[field as keyof DataKecamatan] as number),
    );

    this.filteredKecamatanList = sorted;
  }

  getJumlahPenderita(k: DataKecamatan): number {
    return this.penyakitDipilih === "total" ? k.totalPenderita : Number(k[this.penyakitDipilih as keyof DataKecamatan] || 0);
  }

  lihatDetail(kecamatan: DataKecamatan): void {
    this.router.navigate(["/admin/analitik/kecamatan", kecamatan.id]);
  }

  downloadExcel(): void {
    const headers = ["No", "Kecamatan", "Total Penderita", "Diabetes", "Kardiovaskular", "Obesitas", "Hipertensi", "Kolesterol"];
    const rows = this.filteredKecamatanList.map((k, i) => [i + 1, k.nama, Number(k.totalPenderita), Number(k.diabetes), Number(k.kardiovaskular), Number(k.obesitas), Number(k.hipertensi), Number(k.kolesterol)]);
    const sumField = (f: keyof DataKecamatan) => this.filteredKecamatanList.reduce((s, k) => s + Number(k[f]), 0);
    const totalRow = ["", "TOTAL", sumField("totalPenderita"), sumField("diabetes"), sumField("kardiovaskular"), sumField("obesitas"), sumField("hipertensi"), sumField("kolesterol")];
    const data = [headers, ...rows, totalRow];
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Buat kolom width otomatis berdasarkan data terpanjang di setiap kolom
    const columnWidths = headers.map((_, colIdx) => {
      const maxLen = data.reduce((max, row) => Math.max(max, String(row[colIdx] ?? "").length), 10); // minimal width
      return { wch: maxLen + 2 };
    });

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kecamatan");

    const label = this.daftarPenyakit.find((p) => p.value === this.penyakitDipilih)!.label || "Filtered";
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `Data Kecamatan ${label} - ${timestamp}.xlsx`;

    XLSX.writeFile(workbook, filename, { cellStyles: true });
  }
}