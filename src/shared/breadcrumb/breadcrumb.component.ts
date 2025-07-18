import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "shared-breadcrumb",
  imports: [CommonModule, RouterModule],
  templateUrl: "./breadcrumb.component.html",
  styleUrl: "./breadcrumb.component.css",
})
export class Breadcrumb {
  @Input() menus: string[] = [];

  constructor(private router: Router) {}

  onClick(menu: string) {
    this.router.navigate([menu]);
  }

  onBackToParentPage() {
    this.router.navigate([".."]);
  }
}