import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "app-rekap-kesehatan",
  imports: [Sidebar],
  templateUrl: "./rekap-kesehatan.component.html",
  styleUrl: "./rekap-kesehatan.component.css",
})
export class RekapKesehatan {
  private pageAttributes: BasePage;
  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Rekap Kesehatan | SEHATIN", "");
  }
}