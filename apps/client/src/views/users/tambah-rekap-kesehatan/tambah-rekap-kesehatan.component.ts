import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { Meta, Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Breadcrumb } from "@shared/breadcrumb/breadcrumb.component";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "pages-tambah-rekap-kesehatan",
  standalone: true,
  imports: [Breadcrumb, CommonModule, FormsModule, Header, MatTabsModule, RouterModule, Sidebar],
  templateUrl: "./tambah-rekap-kesehatan.component.html",
  styleUrl: "./tambah-rekap-kesehatan.component.css",
})
export class TambahRekapKesehatan implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;
  public nama_lengkap!: string;

  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;
  private readonly nameLocalStorage = localStorage.setItem("data", JSON.stringify(this.submitData));

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Tambah Rekap Kesehatan | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
  }

  submitData(): void {
    try {

    } catch (err) {
      if (err instanceof Error) return console.warn(err.message);
      else return console.error(err);
      throw err;
    }
  }

  private validateForm() {

  }
}