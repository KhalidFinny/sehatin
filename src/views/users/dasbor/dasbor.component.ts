import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Meta, Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { BasePage } from "@helpers/base-page";
import { HamburgerMenu } from "@shared/hamburger-menu/hamburger-menu.component";

@Component({
  selector: "pages-dasbor-pengguna",
  imports: [CommonModule, Sidebar],
  imports: [CommonModule, HamburgerMenu, Sidebar],
  standalone: true,
  styleUrl: "./dasbor.component.css",
  templateUrl: "./dasbor.component.html",
})
export class DasborPengguna {
  currentDate: string = "";
  currentTime: string = "";

  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta) {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Dasbor | SEHATIN", "");
  }

  updateDateTime() {
    const now = new Date();

    this.currentDate = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    this.currentTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
