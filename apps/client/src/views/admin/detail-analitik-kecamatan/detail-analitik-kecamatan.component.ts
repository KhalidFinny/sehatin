import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChartData, ChartType, ChartOptions } from "chart.js";
import { NgChartsModule } from "ng2-charts";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Header as SharedHeader } from "@shared/header/header.component";
import { getAllDistricts } from "indonesia-nodejs";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { Meta, Title } from "@angular/platform-browser";
import { SidebarService } from "@services/sidebar.service";

interface KecamatanData {
  id: number;
  nama: string;
  totalPenderita: number;
  diabetes: number;
  kardiovaskular: number;
  obesitas: number;
  hipertensi: number;
  kolesterol: number;
  populasi: number;
  trend: number[];
}

@Component({
  selector: "pages-detail-analitik-kecamatan",
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule, Sidebar, SharedHeader],
  templateUrl: "./detail-analitik-kecamatan.component.html",
  styleUrl: "./detail-analitik-kecamatan.component.css",
})
export class DetailAnalitikKecamatan implements OnInit {
  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  kecamatan?: KecamatanData;
  tahunTrend = ["2020", "2021", "2022", "2023", "2024"];

  // Chart Data
  chartPieData: ChartData<"pie", number[], string> = { labels: [], datasets: [] };
  chartLineData: ChartData<"line"> = { labels: [], datasets: [] };
  chartBarData: ChartData<"bar", number[], string> = { labels: [], datasets: [] };
  chartDoughnutData: ChartData<"doughnut", number[], string> = { labels: [], datasets: [] };

  // Chart Options
  chartPieOptions: ChartOptions<"pie"> = this.getLegendOptions<"pie">();
  chartDoughnutOptions: ChartOptions<"doughnut"> = this.getLegendOptions<"doughnut">();
  chartLineOptions: ChartOptions<"line"> = this.getAxisOptions<"line">();
  chartBarOptions: ChartOptions<"bar"> = this.getAxisOptions<"bar">();

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService, private route: ActivatedRoute) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Detail Kecamatan | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  async ngOnInit() {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));

    const id = Number(this.route.snapshot.paramMap.get("id"));
    const allDistricts = await getAllDistricts();
    const malangDistricts = allDistricts.filter((d) => d.city_code === 3507);

    const kecamatanList: KecamatanData[] = malangDistricts.map((district, index) => this.generateKecamatanData(district.name, index + 1));
    this.kecamatan = kecamatanList.find((k) => k.id === id);

    if (this.kecamatan) this.initCharts();
  }

  private generateKecamatanData(nama: string, id: number): KecamatanData {
    const diabetes = this.rand(20, 50);
    const kardiovaskular = this.rand(15, 40);
    const obesitas = this.rand(25, 60);
    const hipertensi = this.rand(30, 80);
    const kolesterol = this.rand(20, 45);

    const totalPenderita = diabetes + kardiovaskular + obesitas + hipertensi + kolesterol;
    const populasi = this.rand(1200, 1500) + totalPenderita;

    const trend = [
      Math.floor(totalPenderita * 0.7),
      Math.floor(totalPenderita * 0.8),
      Math.floor(totalPenderita * 0.85),
      Math.floor(totalPenderita * 0.95),
      totalPenderita,
    ];

    return {
      id,
      nama,
      totalPenderita,
      diabetes,
      kardiovaskular,
      obesitas,
      hipertensi,
      kolesterol,
      populasi,
      trend,
    };
  }

  private initCharts() {
    if (!this.kecamatan) return;

    const { diabetes, kardiovaskular, obesitas, hipertensi, kolesterol, trend, totalPenderita, populasi } = this.kecamatan;

    const penyakitLabels = ["Diabetes", "Kardiovaskular", "Obesitas", "Hipertensi", "Kolesterol"];
    const penyakitData = [diabetes, kardiovaskular, obesitas, hipertensi, kolesterol];
    const warna = ["#2c9ab7", "#b74660", "#f3d07b", "#43a36d", "#26798f"];

    this.chartPieData = {
      labels: penyakitLabels,
      datasets: [{ data: penyakitData, backgroundColor: warna }],
    };

    this.chartBarData = {
      labels: penyakitLabels,
      datasets: [{ data: penyakitData, backgroundColor: warna, borderRadius: 8, maxBarThickness: 32 }],
    };

    this.chartLineData = {
      labels: this.tahunTrend,
      datasets: [{
        label: "Total Penderita",
        data: trend,
        borderColor: "#2c9ab7",
        backgroundColor: "#2c9ab7",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#2c9ab7",
        fill: false,
      }],
    };

    const sehat = Math.max(populasi - totalPenderita, 0);
    this.chartDoughnutData = {
      labels: [...penyakitLabels, "Sehat"],
      datasets: [{
        data: [...penyakitData, sehat],
        backgroundColor: [...warna, "#e5e7eb"],
      }],
    };
  }

  getPercentage(jumlah: number, total?: number): number {
    const denominator = typeof total === "number" ? total : this.kecamatan?.totalPenderita || 0;
    return denominator > 0 ? Math.round((jumlah / denominator) * 100) : 0;
  }

  // Helpers
  private rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getLegendOptions<T extends ChartType>(): ChartOptions<T> {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#1e2a32", font: { size: 14 } },
        },
        tooltip: { enabled: true },
      },
    } as ChartOptions<T>;
  }

  private getAxisOptions<T extends "bar" | "line">(): ChartOptions<T> {
    return {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          ticks: { color: "#2c9ab7" },
          grid: { color: "#e0e7ef" },
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#4c5b67" },
          grid: { color: "#e0e7ef" },
        },
      },
    } as unknown as ChartOptions<T>;
  }
}