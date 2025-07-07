import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "pages-tentang-kami",
  imports: [],
  templateUrl: "./tentang-kami.component.html",
  styleUrl: "./tentang-kami.component.css",
})
export class TentangKami {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle("Tentang Kami");
    this.meta.addTags([
      {
        name: "description",
        content: "Tentang Kami",
      },
      {
        property: "og:title",
        content: "Tentang Kami",
      },
      {
        property: "og:description",
        content: "Tentang Kami",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Tentang Kami",
      },
      {
        property: "twitter:description",
        content: "Tentang Kami",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }
}