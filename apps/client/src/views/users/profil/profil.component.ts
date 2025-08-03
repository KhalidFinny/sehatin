import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";

@Component({
  selector: "pages-profil",
  imports: [CommonModule, Header, Sidebar],
  standalone: true,
  templateUrl: "./profil.component.html",
  styleUrl: "./profil.component.css",
})
export class Profil implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;

  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Profil | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => {
      return this.isSidebarOpen = state;
    });
  }
}