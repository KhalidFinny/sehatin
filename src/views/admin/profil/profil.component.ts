import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "pages-profil-admin",
  standalone: true,
  imports: [Header, Sidebar],
  templateUrl: "./profil.component.html",
  styleUrl: "./profil.component.css",
})
export class Profil {
  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Profil Admin | SEHATIN", "");
  }
}