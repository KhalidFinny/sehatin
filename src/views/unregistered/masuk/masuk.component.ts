import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";
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

  constructor(private title: Title, private meta: Meta, private authService: AuthService, private router: Router) {
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
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);

      if (!success) {
        this.showAlertMessage("Email atau password salah!", "error");
        this.isLoading = false;
        return;
      }

      this.showAlertMessage("Login berhasil!", "success");

      setTimeout(() => {
        const user = this.authService.getCurrentUser();
        if (user == null) return;

        const routeMap: Record<string, string> = {
          admin: "/admin/dasbor",
          user: "/pengguna/dasbor",
        };

        this.router.navigate([routeMap[user.role] || "/"]);
      }, 1000);

      this.isLoading = false;
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
    setTimeout(() => (this.showAlert = false), 3000);
  }
}