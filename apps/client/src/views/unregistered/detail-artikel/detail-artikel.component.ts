import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { articleComponentMap } from "@constants/mapping-articles";
import { BasePage } from "@helpers/base-page";

@Component({
  selector: "app-detail-artikel",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="component">
      <ng-container *ngComponentOutlet="component"></ng-container>
    </ng-container>
    <section *ngIf="!component" class="py-10 text-center text-gray-500">
      Artikel tidak ditemukan.
    </section>
  `,
})
export class DetailArtikel implements OnInit {
  public slug!: string;
  public component: any;
  private route = inject(ActivatedRoute);
  private pageAttributes!: BasePage;

  constructor(public title: Title, public meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
  }

  async ngOnInit(): Promise<void> {
    this.slug = this.route.snapshot.params["slug"];
    this.pageAttributes.setTitleAndMeta(`${this.slug.split("-").slice(0, 5).join(" ")} | SEHATIN`, "");

    const loader = articleComponentMap[this.slug];
    if (loader) this.component = await loader();
    else this.component = null;
  }
}