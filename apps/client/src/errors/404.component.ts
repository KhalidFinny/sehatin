import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "error-404",
  imports: [RouterModule],
  templateUrl: "./404.component.html",
  styleUrl: "./404.component.css",
})
export class Error404 {
  private pageAttributes: BasePage;

  constructor(title: Title, meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("404 | SEHATIN", "");
  }
}