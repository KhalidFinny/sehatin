import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { BasePage } from "@helpers/base-page";
import { SidebarService } from "@services/sidebar.service";
import { Header } from "@shared/header/header.component";
import { Sidebar } from "@shared/sidebar/sidebar.component";
import { Subscription } from "rxjs";

@Component({
  selector: "pages-analitik-pengguna",
  standalone: true,
  imports: [CommonModule, Header, Sidebar],
  templateUrl: "./analitik-pengguna.component.html",
  styleUrl: "./analitik-pengguna.component.css",
})
export class AnalitikPengguna implements OnDestroy, OnInit {
  public isSidebarOpen: boolean = true;
  private pageAttributes: BasePage;
  private sidebarSubscription!: Subscription;

  constructor(public title: Title, public meta: Meta, public sidebarService: SidebarService) {
    this.pageAttributes = new BasePage(title, meta);
    this.pageAttributes.setTitleAndMeta("Analitik Pengguna | SEHATIN", "");
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) this.sidebarSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe((state) => (this.isSidebarOpen = state));
  }
}