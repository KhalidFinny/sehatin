import { CommonModule } from "@angular/common";
import { Component, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { Router, RouterModule } from "@angular/router";
import { AuthService, User } from "@services/auth.service";
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
      return this.showAlertMessage("Email dan kata sandi harus diisi!", "error");
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    this.authService.login(this.surel, this.kata_sandi).then((response) => {
      this.isLoading = false;
      this.showAlertMessage(response.message, response.success ? "success" : "error");
      this.cdr.detectChanges();

      if (response.success) {
        const user = this.authService.currentUser as User;
        const redirect = user.role === "admin" ? "/admin/dasbor" : "/pengguna/dasbor";
        setTimeout(() => this.router.navigate([redirect]), 1000);
      }
    });
  }

  private showAlertMessage(message: string, type: "success" | "error"): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showAlert = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}