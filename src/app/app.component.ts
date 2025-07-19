import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Footer } from "@shared/footer/footer.component";
import { Header } from "@shared/header/header.component";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnDestroy, OnInit {
  private authSubscription?: Subscription;
  authInitialized = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Session timeout: 30 menit (1800000 ms)
    const SESSION_TIMEOUT = 30 * 60 * 1000;
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      const ts = localStorage.getItem('loginTimestamp');
      if (user && ts) {
        const now = Date.now();
        const loginTime = parseInt(ts, 10);
        if (now - loginTime > SESSION_TIMEOUT) {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('loginTimestamp');
        }
      }
      // Reset login jika di halaman utama dan session sudah expired
      if (window.location.pathname === '/' && (!user || !ts || (ts && Date.now() - parseInt(ts, 10) > SESSION_TIMEOUT))) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loginTimestamp');
      }
    }
    this.authSubscription = this.authService.fetchLocalStorage.subscribe((ready) => {
      if (ready) this.authInitialized = true;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription !== undefined) this.authSubscription.unsubscribe();
  }

  isAuthenticatedPage(): boolean {
    const url = this.router.url.split("?")[0];
    return url.startsWith("/admin") || url.startsWith("/pengguna");
  }

  isGuestOnlyPage(): boolean {
    const authRoutes = ["/daftar", "/lupa-kata-sandi", "/masuk", "/ubah-kata-sandi"];
    return authRoutes.includes(this.router.url.split("?")[0]);
  }
}
