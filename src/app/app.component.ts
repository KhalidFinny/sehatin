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
export class AppComponent implements OnInit, OnDestroy {
  title: string = "sehatin";
  private authSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to auth changes
    this.authSubscription = this.authService.authStateChanged.subscribe(() => {
      // Force re-evaluation of auth state
      console.log("Auth state changed, current user:", this.authService.getCurrentUser());
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  isAuthPage(): boolean {
    const authRoutes = ["/daftar", "/lupa-kata-sandi", "/masuk", "/ubah-kata-sandi"];
    return authRoutes.includes(this.router.url.split("?")[0]);
  }

  isDashboardPage(): boolean {
    const dashboardRoutes = ["/admin/dasbor", "/pengguna/dasbor"];
    return dashboardRoutes.includes(this.router.url.split("?")[0]);
  }
}