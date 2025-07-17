import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Sidebar } from '@shared/sidebar/sidebar.component';
import { getAllDistricts } from 'indonesia-nodejs';

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
  trend: number[]; // data trend per tahun
}

@Component({
  selector: 'pages-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule, Sidebar],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  kecamatan: KecamatanData | undefined;

  // Chart 1: Pie Chart distribusi penyakit
  chartPieData: ChartData<'pie', number[], string> = { labels: [], datasets: [] };
  chartPieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#1e2a32', font: { size: 14 } } },
      tooltip: { enabled: true }
    }
  };

  // Chart 2: Line Chart trend per tahun
  chartLineData: ChartData<'line'> = { labels: [], datasets: [] };
  chartLineOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: '#2c9ab7' }, grid: { color: '#e0e7ef' } },
      y: { beginAtZero: true, ticks: { color: '#4c5b67' }, grid: { color: '#e0e7ef' } }
    }
  };

  // Chart 3: Bar Chart perbandingan penyakit
  chartBarData: ChartData<'bar', number[], string> = { labels: [], datasets: [] };
  chartBarOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: '#2c9ab7' }, grid: { color: '#e0e7ef' } },
      y: { beginAtZero: true, ticks: { color: '#4c5b67' }, grid: { color: '#e0e7ef' } }
    }
  };

  // Chart 4: Doughnut Chart persentase PTM vs populasi
  chartDoughnutData: ChartData<'doughnut', number[], string> = { labels: [], datasets: [] };
  chartDoughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#1e2a32', font: { size: 14 } } },
      tooltip: { enabled: true }
    }
  };

  tahunTrend: string[] = ['2020', '2021', '2022', '2023', '2024'];

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Ambil data kecamatan dari indonesia-nodejs
    const allDistricts = await getAllDistricts();
    const malangDistricts = allDistricts.filter(d => d.city_code === 3507);
    // Generate data dummy untuk setiap kecamatan
    const kecamatanList: KecamatanData[] = malangDistricts.map((district, index) => {
      // Data dummy penyakit dan populasi
      const diabetes = Math.floor(Math.random() * 50) + 20;
      const kardiovaskular = Math.floor(Math.random() * 40) + 15;
      const obesitas = Math.floor(Math.random() * 60) + 25;
      const hipertensi = Math.floor(Math.random() * 80) + 30;
      const kolesterol = Math.floor(Math.random() * 45) + 20;
      const totalPenderita = diabetes + kardiovaskular + obesitas + hipertensi + kolesterol;
      const populasi = Math.floor(Math.random() * 1500) + 1200 + totalPenderita; // populasi > totalPenderita
      // Trend dummy
      const trend = [
        Math.floor(totalPenderita * 0.7),
        Math.floor(totalPenderita * 0.8),
        Math.floor(totalPenderita * 0.85),
        Math.floor(totalPenderita * 0.95),
        totalPenderita
      ];
      return {
        id: index + 1,
        nama: district.name,
        totalPenderita,
        diabetes,
        kardiovaskular,
        obesitas,
        hipertensi,
        kolesterol,
        populasi,
        trend
      };
    });
    this.kecamatan = kecamatanList.find(k => k.id === id);
    if (this.kecamatan) {
      // Pie Chart
      this.chartPieData = {
        labels: ['Diabetes', 'Kardiovaskular', 'Obesitas', 'Hipertensi', 'Kolesterol'],
        datasets: [{
          data: [
            this.kecamatan.diabetes,
            this.kecamatan.kardiovaskular,
            this.kecamatan.obesitas,
            this.kecamatan.hipertensi,
            this.kecamatan.kolesterol
          ],
          backgroundColor: ['#2c9ab7', '#b74660', '#f3d07b', '#43a36d', '#26798f'],
        }]
      };
      // Line Chart (Trend)
      this.chartLineData = {
        labels: this.tahunTrend,
        datasets: [{
          label: 'Total Penderita',
          data: this.kecamatan.trend,
          borderColor: '#2c9ab7',
          backgroundColor: '#2c9ab7',
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#2c9ab7',
          fill: false
        }]
      };
      // Bar Chart (Perbandingan penyakit)
      this.chartBarData = {
        labels: ['Diabetes', 'Kardiovaskular', 'Obesitas', 'Hipertensi', 'Kolesterol'],
        datasets: [{
          data: [
            this.kecamatan.diabetes,
            this.kecamatan.kardiovaskular,
            this.kecamatan.obesitas,
            this.kecamatan.hipertensi,
            this.kecamatan.kolesterol
          ],
          backgroundColor: ['#2c9ab7', '#b74660', '#f3d07b', '#43a36d', '#26798f'],
          borderRadius: 8,
          maxBarThickness: 32,
        }]
      };
      // Doughnut Chart (masing-masing penyakit vs sehat)
      const sehat = Math.max(
        this.kecamatan.populasi - (
          this.kecamatan.diabetes +
          this.kecamatan.kardiovaskular +
          this.kecamatan.obesitas +
          this.kecamatan.hipertensi +
          this.kecamatan.kolesterol
        ),
        0
      );
      this.chartDoughnutData = {
        labels: ['Diabetes', 'Kardiovaskular', 'Obesitas', 'Hipertensi', 'Kolesterol', 'Sehat'],
        datasets: [{
          data: [
            this.kecamatan.diabetes,
            this.kecamatan.kardiovaskular,
            this.kecamatan.obesitas,
            this.kecamatan.hipertensi,
            this.kecamatan.kolesterol,
            sehat
          ],
          backgroundColor: ['#2c9ab7', '#b74660', '#f3d07b', '#43a36d', '#26798f', '#e5e7eb'],
        }]
      };
    }
  }

  getPercentage(jumlah: number, total?: number): number {
    if (!this.kecamatan) return 0;
    if (typeof total === 'number') {
      return total > 0 ? Math.round((jumlah / total) * 100) : 0;
    }
    return this.kecamatan.totalPenderita > 0 ? Math.round((jumlah / this.kecamatan.totalPenderita) * 100) : 0;
  }
}
