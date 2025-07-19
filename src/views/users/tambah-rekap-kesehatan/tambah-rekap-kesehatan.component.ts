import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BasePage } from "@helpers/base-page";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Header as SharedHeader } from "@shared/header/header.component";

@Component({
  selector: "pages-tambah-rekap-kesehatan",
  imports: [CommonModule, FormsModule, RouterModule, Sidebar, SharedHeader],
  templateUrl: "./tambah-rekap-kesehatan.component.html",
  styleUrl: "./tambah-rekap-kesehatan.component.css",
})
export class TambahRekapKesehatan {
  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;

  constructor(private title: Title, private meta: Meta) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Tambah Rekap Kesehatan | SEHATIN", "");
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
