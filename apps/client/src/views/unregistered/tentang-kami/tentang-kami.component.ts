import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "pages-tentang-kami",
  imports: [],
  templateUrl: "./tentang-kami.component.html",
  styleUrl: "./tentang-kami.component.css",
})
export class TentangKami {
  private pageAttributes: BasePage;

  constructor(title: Title, meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Tentang Kami | SEHATIN", "");
  }
}