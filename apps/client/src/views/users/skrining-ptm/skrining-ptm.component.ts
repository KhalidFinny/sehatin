import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Subscription } from "rxjs";

@Component({
  selector: "pages-skrining-ptm",
  standalone: true,
  imports: [CommonModule, Header, Sidebar],
  templateUrl: "./skrining-ptm.component.html",
  styleUrl: "./skrining-ptm.component.css",
})
export class SkriningPtm implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;

  private sidebarSubscription!: Subscription;
  private pageAttributes: BasePage;

  constructor(title: Title, meta: Meta, private sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Skrining PTM | SEHATIN", "");
  }

  ngOnDestroy() {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
  }
}