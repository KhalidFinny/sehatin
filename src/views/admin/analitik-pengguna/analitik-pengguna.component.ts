import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "shared-analitik-pengguna",
  standalone: true,
  imports: [Header, Sidebar],
  templateUrl: "./analitik-pengguna.component.html",
  styleUrl: "./analitik-pengguna.component.css",
})
export class AnalitikPengguna {
  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Analitik Pengguna | SEHATIN", "");
  }
}