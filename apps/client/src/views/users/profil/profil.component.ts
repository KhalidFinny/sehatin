import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "pages-profil",
  imports: [CommonModule],
  standalone: true,
  templateUrl: "./profil.component.html",
  styleUrl: "./profil.component.css",
})
export class Profil {
  private pageAttributes: BasePage;

  constructor(title: Title, meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Profil | SEHATIN", "");
  }
}