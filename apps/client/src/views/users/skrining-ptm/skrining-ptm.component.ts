import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Subscription } from "rxjs";
import jsPDF from 'jspdf';

interface Question {
  question: string;
  category: string;
}

@Component({
  selector: "pages-skrining-ptm",
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Sidebar],
  templateUrl: "./skrining-ptm.component.html",
  styleUrl: "./skrining-ptm.component.css",
})
export class SkriningPtm implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;
  public showQuestions: boolean = false;
  public showResult: boolean = false;
  public currentQuestionIndex: number = 0;
  public selectedAnswer: string = '';
  public answers: string[] = [];

  public questions: Question[] = [
    // 5 Pertanyaan untuk Diabetes
    {
      question: "Apakah Anda sering merasa haus berlebihan, bahkan setelah minum cukup air?",
      category: "diabetes"
    },
    {
      question: "Apakah Anda sering buang air kecil, terutama di malam hari?",
      category: "diabetes"
    },
    {
      question: "Apakah Anda merasa sering lelah atau lemas tanpa sebab yang jelas?",
      category: "diabetes"
    },
    {
      question: "Apakah Anda memiliki riwayat keluarga dengan diabetes (ayah, ibu, atau saudara kandung)?",
      category: "diabetes"
    },
    {
      question: "Apakah berat badan Anda berlebih atau mengalami penurunan berat badan drastis tanpa diet?",
      category: "diabetes"
    },

    // 5 Pertanyaan untuk Hipertensi
    {
      question: "Apakah Anda sering merasa pusing atau sakit kepala tiba-tiba tanpa penyebab?",
      category: "hipertensi"
    },
    {
      question: "Apakah Anda sering merasa jantung berdebar atau tidak teratur saat beristirahat?",
      category: "hipertensi"
    },
    {
      question: "Apakah Anda jarang berolahraga atau memiliki gaya hidup sedentari (lebih banyak duduk)?",
      category: "hipertensi"
    },
    {
      question: "Apakah Anda memiliki kebiasaan mengonsumsi makanan tinggi garam (asin, makanan olahan)?",
      category: "hipertensi"
    },
    {
      question: "Apakah orang tua atau saudara kandung Anda memiliki riwayat tekanan darah tinggi?",
      category: "hipertensi"
    },

    // 5 Pertanyaan untuk Kardiovaskular
    {
      question: "Apakah Anda pernah merasakan nyeri dada saat beraktivitas atau stres emosional?",
      category: "kardiovaskular"
    },
    {
      question: "Apakah Anda mudah lelah atau sesak napas saat melakukan aktivitas ringan?",
      category: "kardiovaskular"
    },
    {
      question: "Apakah Anda merokok atau pernah merokok secara rutin?",
      category: "kardiovaskular"
    },
    {
      question: "Apakah Anda sering mengalami pembengkakan pada pergelangan kaki atau kaki?",
      category: "kardiovaskular"
    },
    {
      question: "Apakah Anda memiliki riwayat keluarga dengan penyakit jantung atau stroke?",
      category: "kardiovaskular"
    },

    // 5 Pertanyaan untuk Obesitas
    {
      question: "Apakah lingkar perut Anda melebihi 90 cm (pria) atau 80 cm (wanita)?",
      category: "obesitas"
    },
    {
      question: "Apakah Anda merasa nafsu makan sulit dikendalikan, terutama makanan tinggi gula/lemak?",
      category: "obesitas"
    },
    {
      question: "Apakah Anda jarang melakukan aktivitas fisik minimal 30 menit per hari?",
      category: "obesitas"
    },
    {
      question: "Apakah Anda memiliki kebiasaan makan malam terlalu larut atau sebelum tidur?",
      category: "obesitas"
    },
    {
      question: "Apakah Anda merasa berat badan Anda mengganggu aktivitas sehari-hari?",
      category: "obesitas"
    },

    // 5 Pertanyaan untuk Kolesterol
    {
      question: "Apakah Anda sering mengonsumsi makanan tinggi lemak jenuh (gorengan, fast food, daging merah)?",
      category: "kolesterol"
    },
    {
      question: "Apakah Anda jarang mengonsumsi sayur dan buah setiap hari?",
      category: "kolesterol"
    },
    {
      question: "Apakah Anda sering merasa leher atau bahu pegal tanpa sebab?",
      category: "kolesterol"
    },
    {
      question: "Apakah Anda mengalami berat badan berlebih atau kelebihan lemak di perut?",
      category: "kolesterol"
    },
    {
      question: "Apakah Anda memiliki riwayat keluarga dengan kolesterol tinggi atau serangan jantung?",
      category: "kolesterol"
    }
  ];

  private sidebarSubscription!: Subscription;
  private pageAttributes: BasePage;

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Skrining PTM | SEHATIN", "");
  }

  ngOnDestroy() {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
  }

  getCategoryTitle(category: string): string {
    const titles: { [key: string]: string } = {
      'diabetes': 'Diabetes',
      'hipertensi': 'Hipertensi (Tekanan Darah Tinggi)',
      'kardiovaskular': 'Kardiovaskular (Penyakit Jantung & Pembuluh Darah)',
      'obesitas': 'Obesitas',
      'kolesterol': 'Kolesterol Tinggi'
    };
    return titles[category] || category;
  }

  startSkrining(): void {
    this.showQuestions = true;
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.selectedAnswer = '';
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      this.nextQuestion();
    }, 500);
  }

  nextQuestion(): void {
    if (this.selectedAnswer) {
      this.answers[this.currentQuestionIndex] = this.selectedAnswer;

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = '';
      } else {
        // Selesai menjawab semua pertanyaan
        this.showQuestions = false;
        this.showResult = true;
      }
    }
  }

  resetSkrining(): void {
    this.showQuestions = false;
    this.showResult = false;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = '';
    this.answers = [];
  }

  downloadPDF(): void {
    try {
      const doc = new jsPDF();

      // Set font and styling
      doc.setFont('helvetica');
      doc.setFontSize(16);
      doc.setTextColor(44, 154, 183); // Blue color matching theme
      doc.text('HASIL SKRINING PTM - SEHATIN', 15, 20);

      // Reset text color and set date
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 15, 30);

      // Analysis section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('ANALISIS RISIKO:', 15, 45);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('1. Hipertensi: TINGGI (85%)', 15, 55);
      doc.text('2. Diabetes: SEDANG (60%)', 15, 63);
      doc.text('3. Obesitas: RENDAH (30%)', 15, 71);
      doc.text('4. Kardiovaskular: SEDANG (55%)', 15, 79);
      doc.text('5. Kolesterol: RENDAH (25%)', 15, 87);

      // Recommendations section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('REKOMENDASI:', 15, 102);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('- Konsultasi dengan dokter untuk pemeriksaan tekanan darah', 15, 110);
      doc.text('- Olahraga rutin 30 menit sehari, 5x seminggu', 15, 116);
      doc.text('- Diet sehat dengan mengurangi garam dan lemak', 15, 122);
      doc.text('- Kelola stres dengan teknik relaksasi', 15, 128);

      // Note section
      doc.setFontSize(10);
      doc.text('Catatan: Hasil ini hanya sebagai panduan awal. Konsultasi dengan dokter tetap diperlukan untuk diagnosis yang akurat.', 15, 140, {maxWidth: 180});

      // Save the PDF
      const filename = `hasil-skrining-ptm-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);

      console.log('PDF generated successfully:', filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to text file if PDF generation fails
      const content = `
HASIL SKRINING PTM - SEHATIN

Tanggal: ${new Date().toLocaleDateString('id-ID')}

ANALISIS RISIKO:

1. Hipertensi: TINGGI (85%)
2. Diabetes: SEDANG (60%)
3. Obesitas: RENDAH (30%)
4. Kardiovaskular: SEDANG (55%)
5. Kolesterol: RENDAH (25%)

REKOMENDASI:
- Konsultasi dengan dokter untuk pemeriksaan tekanan darah
- Olahraga rutin 30 menit sehari, 5x seminggu
- Diet sehat dengan mengurangi garam dan lemak
- Kelola stres dengan teknik relaksasi

Catatan: Hasil ini hanya sebagai panduan awal.
Konsultasi dengan dokter tetap diperlukan untuk diagnosis yang akurat.
      `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hasil-skrining-ptm-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }
}
