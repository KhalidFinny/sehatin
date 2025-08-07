import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { questionsForScreening } from "@constants/questions-for-screening";
import jsPDF from "jspdf";

@Component({
  selector: "pages-skrining-ptm",
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Sidebar],
  templateUrl: "./skrining-ptm.component.html",
  styleUrl: "./skrining-ptm.component.css",
})
export class SkriningPtm implements OnDestroy, OnInit {
  public answers: string[] = [];
  public currentQuestionIndex: number = 0;
  public isSidebarOpen: boolean = true;
  public selectedAnswer: string = "";
  public showResult: boolean = false;
  public showQuestions: boolean = false;
  public questions!: typeof questionsForScreening;

  private sidebarSubscription!: Subscription;
  private pageAttributes: BasePage;

  constructor(public title: Title, public meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Skrining PTM | SEHATIN", "");
  }

  ngOnDestroy() {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
    this.questions = questionsForScreening;
  }

  public getCategoryTitle(category: string): string {
    const titles: { [key: string]: string } = {
      diabetes: "Diabetes",
      hipertensi: "Hipertensi (Tekanan Darah Tinggi)",
      kardiovaskular: "Kardiovaskular (Penyakit Jantung & Pembuluh Darah)",
      obesitas: "Obesitas",
      kolesterol: "Kolesterol Tinggi",
    };

    return titles[category] || category;
  }

  public startScreening(): void {
    this.showQuestions = true;
    this.currentQuestionIndex = 0;
    this.answers = [];
    this.selectedAnswer = "";
  }

  public selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    setTimeout(() => this.nextQuestion(), 500);
  }

  public nextQuestion(): void {
    if (!this.selectedAnswer) return;
    this.answers[this.currentQuestionIndex] = this.selectedAnswer;

    if (this.currentQuestionIndex >= questionsForScreening.length - 1) {
      this.showQuestions = false;
      this.showResult = true;
      return;
    }

    this.currentQuestionIndex++;
    this.selectedAnswer = "";
  }

  public resetScreening(): void {
    this.showQuestions = false;
    this.showResult = false;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = "";
    this.answers = [];
  }

  public downloadPDF(): void {
    try {
      const doc = new jsPDF();

      // Set font and styling
      doc.setFont("helvetica");
      doc.setFontSize(16);
      doc.setTextColor(44, 154, 183); // Blue color matching theme
      doc.text("HASIL SKRINING PTM - SEHATIN", 15, 20);

      // Reset text color and set date
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 15, 30);

      // Analysis section
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("ANALISIS RISIKO:", 15, 45);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("1. Hipertensi: TINGGI (85%)", 15, 55);
      doc.text("2. Diabetes: SEDANG (60%)", 15, 63);
      doc.text("3. Obesitas: RENDAH (30%)", 15, 71);
      doc.text("4. Kardiovaskular: SEDANG (55%)", 15, 79);
      doc.text("5. Kolesterol: RENDAH (25%)", 15, 87);

      // Recommendations section
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("REKOMENDASI:", 15, 102);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("- Konsultasi dengan dokter untuk pemeriksaan tekanan darah", 15, 110);
      doc.text("- Olahraga rutin 30 menit sehari, 5x seminggu", 15, 116);
      doc.text("- Diet sehat dengan mengurangi garam dan lemak", 15, 122);
      doc.text("- Kelola stres dengan teknik relaksasi", 15, 128);

      // Note section
      doc.setFontSize(10);
      doc.text("Catatan: Hasil ini hanya sebagai panduan awal. Konsultasi dengan dokter tetap diperlukan untuk diagnosis yang akurat.", 15, 140, { maxWidth: 180 });

      // Save the PDF
      const filename = `Hasil Skrining PTM ${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(filename);

      console.log("PDF generated successfully: ", filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback to text file if PDF generation fails
      const content = `
        HASIL SKRINING PTM - SEHATIN

        Tanggal: ${new Date().toLocaleDateString("id-ID")}

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

      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Hasil Skrining PTM ${new Date().toISOString().split("T")[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }
}