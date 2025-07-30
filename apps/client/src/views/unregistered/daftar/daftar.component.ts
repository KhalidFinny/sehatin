import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";
import { BasePage } from "@helpers/base-page";
import { Input } from "@shared/input/input.component";

@Component({
  selector: "pages-daftar",
  standalone: true,
  imports: [CommonModule, FormsModule, Input, RouterModule],
  templateUrl: "./daftar.component.html",
  styleUrl: "./daftar.component.css",
})
export class Daftar {
  surel: string = "";
  nama_lengkap: string = "";
  nik: string = "";
  kata_sandi: string = "";
  konfirmasi_kata_sandi: string = "";
  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: "success" | "error" = "success";

  private pageAttributes: BasePage;

  constructor(private router: Router, title: Title, meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Daftar | SEHATIN", "");
  }

  onRegister(): void {
    if (!this.surel || !this.nama_lengkap || !this.nik || !this.kata_sandi || !this.konfirmasi_kata_sandi) {
      this.showAlertMessage("Semua field harus diisi!", "error");
      return;
    } else if (this.kata_sandi !== this.konfirmasi_kata_sandi) {
      this.showAlertMessage("Password dan konfirmasi kata_sandi tidak cocok!", "error");
      return;
    } else if (this.kata_sandi.length < 6) {
      this.showAlertMessage("Password minimal 6 karakter!", "error");
      return;
    } else if (this.nik.length < 8) {
      this.showAlertMessage("NIK minimal 8 karakter!", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.surel)) {
      this.showAlertMessage("Format surel tidak valid!", "error");
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.showAlertMessage("Registrasi berhasil! Silakan login.", "success");
      this.isLoading = false;
      setTimeout(() => this.router.navigate(["/masuk"]), 2000);
    }, 1000);
  }

  onLogin(): void {
    this.router.navigate(["/masuk"]);
  }

  onBack(): void {
    this.router.navigate(["/"]);
  }

  private showAlertMessage(message: string, type: "success" | "error"): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }
}