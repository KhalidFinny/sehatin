import { Component } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";
import { Footer } from "@shared/footer/footer.component";
import { Header } from "@shared/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-root",
  imports: [CommonModule, Header, RouterOutlet, Footer],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title: string = "sehatin";

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/masuk' || this.router.url === '/daftar';
  }
}
