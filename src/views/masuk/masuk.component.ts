import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "pages-masuk",
  imports: [],
  templateUrl: "./masuk.component.html",
  styleUrl: "./masuk.component.css",
})
export class Masuk {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle("Masuk");
    this.meta.addTags([
      {
        name: "description",
        content: "Masuk",
      },
      {
        property: "og:title",
        content: "Masuk",
      },
      {
        property: "og:description",
        content: "Masuk",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Masuk",
      },
      {
        property: "twitter:description",
        content: "Masuk",
      },
      {
        property: "twitter:image",
        content: "",
      },
    ]);
  }
}