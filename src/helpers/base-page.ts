import { Meta, Title } from "@angular/platform-browser";

export class BasePage {
  constructor(private title: Title, private meta: Meta) {}

  setTitleAndMeta(title: string, description: string) {
    this.title.setTitle(title);
    this.meta.addTags([
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sehatin.id" },
      { property: "og:site_name", content: "SEHATIN" },
      { property: "twitter:title", content: title },
      { property: "twitter:description", content: description },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:site", content: "@sehatin" },
      { property: "twitter:creator", content: "@sehatin" },
      { property: "twitter:url", content: "https://sehatin.id" },
      { property: "twitter:domain", content: "https://sehatin.id" },
    ]);
  }
}