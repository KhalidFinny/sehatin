import { Component } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dasbor',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NgChartsModule, FormsModule],
  templateUrl: './dasbor.component.html',
  styleUrl: './dasbor.component.css',
})
export class DasborComponent {
  userType = 'admin';
  currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  currentTime = new Date().toLocaleTimeString('id-ID');

  penyakitList = [
    { label: 'Kolesterol', value: 'kolesterol' },
    { label: 'Hipertensi', value: 'hipertensi' },
    { label: 'Diabetes', value: 'diabetes' },
  ];
  selectedPenyakit = 'kolesterol';

  kecamatanLabels = [
    'Ampelgading', 'Bantur', 'Bululawang', 'Dampit', 'Dau', 'Donomulyo', 'Gedangan', 'Gondanglegi',
    'Jabung', 'Kalipare', 'Karangploso', 'Kasembon', 'Kepanjen', 'Kromengan', 'Lawang', 'Ngajum',
    'Ngantang', 'Pagak', 'Pagelaran', 'Pakis', 'Pakisaji', 'Poncokusumo', 'Pujon', 'Sumbermanjing Wetan',
    'Singosari', 'Sumberpucung', 'Tajinan', 'Tirtoyudo', 'Tumpang', 'Turen', 'Wagir', 'Wajak', 'Wonosari',
  ];

  penyakitData: Record<string, number[]> = {
    kolesterol: Array(33).fill(0).map(() => Math.floor(Math.random() * 120) + 20),
    hipertensi: Array(33).fill(0).map(() => Math.floor(Math.random() * 100) + 10),
    diabetes: Array(33).fill(0).map(() => Math.floor(Math.random() * 80) + 5),
  };

  yearList = [2020, 2021, 2022, 2023, 2024, 2025];
  selectedYear = 2023;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#b74660',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#b74660',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#0ea5e9',
          font: { weight: 'normal', size: 12 },
        },
        grid: {
          color: '#e0e7ef',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#64748b',
          font: { weight: 'normal', size: 12 },
        },
        grid: {
          color: '#e0e7ef',
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData = {
    labels: this.kecamatanLabels,
    datasets: [
      {
        data: this.penyakitData[this.selectedPenyakit],
        label: 'Jumlah Kasus',
        backgroundColor: 'rgba(14,165,233,0.7)', // biru utama
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(34,211,238,0.9)', // cyan terang saat hover
        maxBarThickness: 32,
      }
    ]
  };

  onPenyakitChange() {
    this.barChartData = {
      labels: this.kecamatanLabels,
      datasets: [
        {
          data: this.penyakitData[this.selectedPenyakit],
          label: 'Jumlah Kasus',
          backgroundColor: 'rgba(14,165,233,0.7)',
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(34,211,238,0.9)',
          maxBarThickness: 32,
        }
      ]
    };
  }

  // Pie chart data: total kasus per penyakit
  public pieChartLabels = ['Kolesterol', 'Hipertensi', 'Diabetes'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [
          this.penyakitData['kolesterol'].reduce((a, b) => a + b, 0),
          this.penyakitData['hipertensi'].reduce((a, b) => a + b, 0),
          this.penyakitData['diabetes'].reduce((a, b) => a + b, 0),
        ],
        backgroundColor: ['#0ea5e9', '#f59e42', '#22d3ee'], // primary, secondary, accent
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 8,
      },
    ],
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#334155',
          font: { size: 14, weight: 'normal' },
        },
      },
      tooltip: {
        backgroundColor: '#0ea5e9',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#38bdf8',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  // Line chart data: tren penyakit per tahun
  public lineChartLabels = this.yearList.map(String);
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [
      {
        label: 'Kolesterol',
        data: this.yearList.map(() => Math.floor(Math.random() * 300) + 100),
        borderColor: '#0ea5e9', // primary
        backgroundColor: 'rgba(14,165,233,0.15)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#0ea5e9',
        fill: true,
      },
      {
        label: 'Hipertensi',
        data: this.yearList.map(() => Math.floor(Math.random() * 200) + 80),
        borderColor: '#f59e42', // secondary
        backgroundColor: 'rgba(245,158,66,0.15)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#f59e42',
        fill: true,
      },
      {
        label: 'Diabetes',
        data: this.yearList.map(() => Math.floor(Math.random() * 150) + 50),
        borderColor: '#22d3ee', // accent
        backgroundColor: 'rgba(34,211,238,0.15)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#22d3ee',
        fill: true,
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#334155',
          font: { size: 14, weight: 'normal' },
        },
      },
      tooltip: {
        backgroundColor: '#0ea5e9',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#38bdf8',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#0ea5e9',
          font: { weight: 'normal', size: 12 },
        },
        grid: {
          color: '#e0e7ef',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#64748b',
          font: { weight: 'normal', size: 12 },
        },
        grid: {
          color: '#e0e7ef',
        },
      },
    },
  };

  getColorVar(name: string): string {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#000';
    }
    return '#000';
  }

  ngOnInit() {
    // Update chart colors after view init
    const primary = '#0ea5e9'; // biru utama
    const secondary = this.getColorVar('--color-secondary');
    const accent = this.getColorVar('--color-accent');
    const cyan = '#22d3ee';

    // Bar chart warna biru utama
    this.barChartData.datasets[0].backgroundColor = primary;
    this.barChartData.datasets[0].hoverBackgroundColor = cyan;

    // Pie chart warna: primary, secondary, accent
    this.pieChartData.datasets[0].backgroundColor = [primary, secondary, accent];

    // Line chart warna: primary, secondary, accent
    this.lineChartData.datasets[0].borderColor = primary;
    this.lineChartData.datasets[0].backgroundColor = primary + '22';
    this.lineChartData.datasets[0].pointBackgroundColor = primary;
    this.lineChartData.datasets[1].borderColor = secondary;
    this.lineChartData.datasets[1].backgroundColor = secondary + '22';
    this.lineChartData.datasets[1].pointBackgroundColor = secondary;
    this.lineChartData.datasets[2].borderColor = accent;
    this.lineChartData.datasets[2].backgroundColor = accent + '22';
    this.lineChartData.datasets[2].pointBackgroundColor = accent;
  }
}
