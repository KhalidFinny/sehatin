import { Component, ChangeDetectorRef } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";
import { InputComponent } from "@shared/input/input.component";

@Component({
  selector: "pages-masuk",
  imports: [FormsModule, CommonModule, InputComponent],
  templateUrl: "./masuk.component.html",
  styleUrl: "./masuk.component.css",
})
export class Masuk {
  email: string = "";
  password: string = "";
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: "success" | "error" = "error";
  isLoading: boolean = false;

  constructor(
    private title: Title,
    private meta: Meta,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.title.setTitle("Masuk - SEHATIN");
    this.meta.addTags([
      {
        name: "description",
        content: "Masuk ke sistem SEHATIN",
      },
      {
        property: "og:title",
        content: "Masuk - SEHATIN",
      },
      {
        property: "og:description",
        content: "Masuk ke sistem SEHATIN",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Masuk - SEHATIN",
      },
      {
        property: "twitter:description",
        content: "Masuk ke sistem SEHATIN",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.showAlertMessage("Email dan password harus diisi!", "error");
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges(); 
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);

      if (!success) {
        this.showAlertMessage("Email atau password salah!", "error");
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
        if (user) {
          if (user.role === 'admin') {
            window.location.href = '/admin/dasbor';
          } else {
            window.location.href = '/pengguna/dasbor';
          }
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

  onBack(): void {
    this.router.navigate(["/"]);
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
