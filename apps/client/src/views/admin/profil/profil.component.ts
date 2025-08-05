import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { SidebarService } from "@services/sidebar.service";

@Component({
  selector: "pages-profil-admin",
  standalone: true,
  imports: [CommonModule, Header, Sidebar],
  templateUrl: "./profil.component.html",
  styleUrl: "./profil.component.css",
})
export class Profil implements OnDestroy, OnInit {
    public isSidebarOpen: boolean = true;
    private pageAttributes: BasePage;
    private sidebarSubscription!: Subscription;

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Profil Admin | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit() {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
  }
}