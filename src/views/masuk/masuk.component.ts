import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: "pages-masuk",
  imports: [FormsModule, CommonModule, InputComponent],
  templateUrl: "./masuk.component.html",
  styleUrl: "./masuk.component.css",
})
export class Masuk {
  email: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'error';
  isLoading: boolean = false;

  constructor(
    private title: Title,
    private meta: Meta,
    private authService: AuthService,
    private router: Router
  ) {
    this.title.setTitle("Masuk - Sehatin");
    this.meta.addTags([
      {
        name: "description",
        content: "Masuk ke sistem Sehatin",
      },
      {
        property: "og:title",
        content: "Masuk - Sehatin",
      },
      {
        property: "og:description",
        content: "Masuk ke sistem Sehatin",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Masuk - Sehatin",
      },
      {
        property: "twitter:description",
        content: "Masuk ke sistem Sehatin",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.showAlertMessage('Email dan password harus diisi!', 'error');
      return;
    }

    this.isLoading = true;

    // Simulasi delay untuk UX yang lebih baik
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);

      if (success) {
        this.showAlertMessage('Login berhasil!', 'success');
        setTimeout(() => {
          const user = this.authService.getCurrentUser();
          if (user?.role === 'admin') {
            this.router.navigate(['/dashboard-admin']);
          } else if (user?.role === 'user') {
            this.router.navigate(['/dashboard-user']);
          } else {
            this.router.navigate(['/']);
          }
        }, 1000);
      } else {
        this.showAlertMessage('Email atau password salah!', 'error');
      }

      this.isLoading = false;
    }, 1000);
  }

  onGoogleLogin(): void {
    this.showAlertMessage('Fitur login dengan Google akan segera hadir!', 'error');
  }

  onRegister(): void {
    this.router.navigate(['/daftar']);
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  private showAlertMessage(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
