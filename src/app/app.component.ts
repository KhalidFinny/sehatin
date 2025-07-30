import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Footer } from "@shared/footer/footer.component";
import { Header } from "@shared/header/header.component";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit, OnDestroy {
  private authSubscription?: Subscription;
  authInitialized = false;
  readonly SESSION_TIMEOUT = 30 * 60 * 1000;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (this.isBrowser()) {
      this.handleSessionTimeout();
      this.clearSessionIfAtRoot();
    }

    this.authSubscription = this.authService.fetchLocalStorage.subscribe((ready) => {
      if (ready) this.authInitialized = true;
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  isAuthenticatedPage(): boolean {
    const path = this.router.url.split("?")[0];
    return path.startsWith("/admin") || path.startsWith("/pengguna");
  }

  isGuestOnlyPage(): boolean {
    const guestRoutes = ["/daftar", "/lupa-kata-sandi", "/masuk", "/ubah-kata-sandi"];
    const path = this.router.url.split("?")[0];
    return guestRoutes.includes(path);
  }

  // ===========================
  // ===== Helper Methods ======
  // ===========================

  private isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  private getSessionInfo() {
    const user = localStorage.getItem("currentUser");
    const timestamp = localStorage.getItem("loginTimestamp");
    const loginTime = timestamp ? parseInt(timestamp, 10) : null;
    return { user, loginTime };
  }

  private hasSessionExpired(loginTime: number | null): boolean {
    return loginTime !== null && (Date.now() - loginTime > this.SESSION_TIMEOUT);
  }

  private clearSession() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginTimestamp");
  }

  private handleSessionTimeout() {
    const { user, loginTime } = this.getSessionInfo();
    if (user && this.hasSessionExpired(loginTime)) {
      this.clearSession();
    }
  }

  private clearSessionIfAtRoot() {
    const path = window.location.pathname;
    const { user, loginTime } = this.getSessionInfo();
    if (path === "/" && (!user || loginTime === null || this.hasSessionExpired(loginTime))) {
      this.clearSession();
    }
  }
}