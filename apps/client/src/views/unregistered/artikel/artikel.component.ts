import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { Article, listOfArticles } from "@constants/list-of-articles";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "app-artikel",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./artikel.component.html",
  styleUrl: "./artikel.component.css",
})
export class Artikel {
  public listOfArticles!: Article[];

  private pageAttributes!: BasePage;

  constructor(public title: Title, public meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Artikel | SEHATIN", "");
    this.listOfArticles = listOfArticles;
  }
}