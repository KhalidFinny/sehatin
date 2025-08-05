import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, Router, NavigationEnd, Event } from "@angular/router";
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
export class AppComponent implements OnDestroy, OnInit {
  public authInitialized = false;
  private authSubscription?: Subscription;
  readonly SESSION_TIMEOUT = 30 * 60 * 1000;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  ngOnInit() {
    if (typeof window === "undefined") return;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects;
        const { user, loginTime } = this.getSessionInfo();
        if (currentPath === "/" && user && loginTime !== null && (Date.now() - loginTime > this.SESSION_TIMEOUT)) this.authService.logout();
        this.updateBodyClass(currentPath);
      }
    });

    this.authSubscription = this.authService.fetchLocalStorage.subscribe((ready) => {
      if (ready) this.authInitialized = true;
    });
  }

  public isAuthenticatedPage(): boolean {
    return this.router.url.split("?")[0].startsWith("/admin") || this.router.url.split("?")[0].startsWith("/pengguna");
  }

  public isAuthenticationPage(): boolean {
    return ["/daftar", "/lupa-kata-sandi", "/masuk", "/ubah-kata-sandi"].includes(this.router.url.split("?")[0]);
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

  private updateBodyClass(path: string) {
    document.body.classList.remove("container");
    if (!path.startsWith("/admin") || !path.startsWith("/pengguna")) document.body.classList.add("container");
  }
}