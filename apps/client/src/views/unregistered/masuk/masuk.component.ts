import { CommonModule } from "@angular/common";
import { Component, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { Input } from "@shared/input/input.component";
import { BasePage } from "helpers/base-page";

@Component({
  selector: "pages-masuk",
  imports: [CommonModule, FormsModule, Input, RouterModule],
  templateUrl: "./masuk.component.html",
  styleUrl: "./masuk.component.css",
})
export class Masuk {
  surel: string = "";
  kata_sandi: string = "";
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: "success" | "error" = "error";
  isLoading: boolean = false;

  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta, private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Masuk | SEHATIN", "");
  }

  onLogin(): void {
    if (!this.surel || !this.kata_sandi) {
      this.showAlertMessage("Email dan kata_sandi harus diisi!", "error");
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      const success = this.authService.login(this.surel, this.kata_sandi);

      if (!success) {
        this.showAlertMessage("Email atau kata sandi salah!", "error");
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }

      this.showAlertMessage("Login berhasil!", "success");
      this.isLoading = false;
      this.cdr.detectChanges();

      // Redirect manual dengan delay untuk memastikan state ter-update
      setTimeout(() => {
        const user = this.authService.getCurrentUser();
        if (user === null) {
          this.showAlertMessage("Pengguna tidak ditemukan!", "error");
          return;
        } else if (user.role === "admin") {
          window.location.href = "/admin/dasbor";
        } else {
          window.location.href = "/pengguna/dasbor";
        }
      }, 1000);
    }, 1000);
  }

  onGoogleLogin(): void {
    this.showAlertMessage("Fitur masuk dengan Google akan segera hadir!", "error");
  }

  onRegister(): void {
    this.router.navigate(["/daftar"]);
  }

  private showAlertMessage(message: string, type: "success" | "error"): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    this.cdr.detectChanges(); // Force change detection
    setTimeout(() => {
      this.showAlert = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}