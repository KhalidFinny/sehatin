import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, Router } from "@angular/router";
import { Footer } from "@shared/footer/footer.component";
import { Header } from "@shared/header/header.component";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title: string = "sehatin";

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    const authRoutes = ["/daftar", "/lupa-kata-sandi", "/masuk", "/ubah-kata-sandi"];
    return authRoutes.includes(this.router.url.split("?")[0]);
  }
}