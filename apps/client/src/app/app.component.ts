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
  imports: [CommonModule, Footer, Header, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit, OnDestroy {
  private authSubscription?: Subscription;
  authInitialized = false;
  readonly SESSION_TIMEOUT = 30 * 60 * 1000;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (typeof window === "undefined") return;

    const { user, loginTime } = this.getSessionInfo();

    if (user && window.location.pathname === "/" && this.hasSessionExpired(loginTime)) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("loginTimestamp");
    }

    this.updateBodyClass();

    this.authSubscription = this.authService.fetchLocalStorage.subscribe((ready) => {
      if (ready) this.authInitialized = true;
      this.updateBodyClass();
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

  private getSessionInfo() {
    const user = localStorage.getItem("currentUser");
    const timestamp = localStorage.getItem("loginTimestamp");
    const loginTime = timestamp ? parseInt(timestamp, 10) : null;
    return { user, loginTime };
  }

  private hasSessionExpired(loginTime: number | null): boolean {
    return loginTime !== null && (Date.now() - loginTime > this.SESSION_TIMEOUT);
  }

  private updateBodyClass() {
    const isAuthPage = window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/pengguna");
    document.body.classList.remove("container");
    if (!isAuthPage) document.body.classList.add("container");
  }
}