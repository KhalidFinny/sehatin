import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "pages-tambah-rekap-kesehatan",
  imports: [],
  templateUrl: "./tambah-rekap-kesehatan.component.html",
  styleUrl: "./tambah-rekap-kesehatan.component.css",
})
export class TambahRekapKesehatan {
  private pageAttributes: BasePage;
  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Tambah Rekap Kesehatan | SEHATIN", "");
  }
}