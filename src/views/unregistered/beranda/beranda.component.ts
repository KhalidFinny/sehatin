import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "pages-beranda",
  standalone: true,
  templateUrl: "./beranda.component.html",
  styleUrl: "./beranda.component.css",
})
export class Beranda {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {
    this.title.setTitle("Beranda");
    this.meta.addTags([
      {
        name: "description",
        content: "Beranda",
      },
      {
        property: "og:title",
        content: "Beranda",
      },
      {
        property: "og:description",
        content: "Beranda",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Beranda",
      },
      {
        property: "twitter:description",
        content: "Beranda",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }
}