import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "helpers/base-page";

@Component({
  selector: "pages-kontak",
  standalone: true,
  imports: [],
  templateUrl: "./kontak.component.html",
  styleUrl: "./kontak.component.css",
})
export class Kontak {
  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Kontak | SEHATIN", "");
  }
}