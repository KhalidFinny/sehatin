import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "pages-skrining-ptm",
  imports: [CommonModule, Sidebar],
  templateUrl: "./skrining-ptm.component.html",
  styleUrl: "./skrining-ptm.component.css",
})
export class SkriningPtm {
  public isSidebarOpen: boolean = true
  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Skrining PTM | SEHATIN", "");
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}