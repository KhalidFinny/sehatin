import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { InputComponent } from "@shared/input/input.component";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "pages-daftar",
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent],
  templateUrl: "./daftar.component.html",
  styleUrl: "./daftar.component.css",
})
export class DaftarComponent {
  email: string = "";
  name: string = "";
  nik: string = "";
  password: string = "";
  confirmPassword: string = "";
  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: "success" | "error" = "success";

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.title.setTitle("Daftar | SEHATIN");
    this.meta.addTags([
      {
        name: "description",
        content: "Daftar ke sistem SEHATIN",
      },
      {
        property: "og:title",
        content: "Daftar | SEHATIN",
      },
      {
        property: "og:description",
        content: "Daftar ke sistem SEHATIN",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Daftar | SEHATIN",
      },
      {
        property: "twitter:description",
        content: "Daftar ke sistem SEHATIN",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }

  onRegister(): void {
    if (!this.email || !this.name || !this.nik || !this.password || !this.confirmPassword) {
      this.showAlertMessage("Semua field harus diisi!", "error");
      return;
    } else if (this.password !== this.confirmPassword) {
      this.showAlertMessage("Password dan konfirmasi password tidak cocok!", "error");
      return;
    } else if (this.password.length < 6) {
      this.showAlertMessage("Password minimal 6 karakter!", "error");
      return;
    } else if (this.nik.length < 8) {
      this.showAlertMessage("NIK minimal 8 karakter!", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showAlertMessage("Format email tidak valid!", "error");
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