import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CURRENT_USER } from "@constants/local-storage-keys";
import { Text } from "@helpers/text";

@Component({
  selector: "shared-breadcrumb",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"],
})
export class Breadcrumb {
  @Input() menus: string[] = [];

  public dashboardLink: string = "/";
  public truncateText = Text.truncateText;

  private baseRoute: string = "/";

  constructor(private router: Router) {
    this.setBaseRoute();
  }
  
  public onClick(menu: string): void {
    const slug = menu.toLowerCase().replace(/\s+/g, "-");
    this.router.navigate([`${this.baseRoute}/${slug}`]);
  }

  private setBaseRoute(): void {
    const data = localStorage.getItem(CURRENT_USER);
    if (!data) return;

    try {
      const { role } = JSON.parse(data) as { role: string };

      if (role === "admin") {
        this.baseRoute = "/admin";
      } else if (role === "user" || role === "pengguna") {
        this.baseRoute = "/pengguna";
      }

      this.dashboardLink = `${this.baseRoute}/dasbor`;
    } catch (err) {
      console.warn("Format currentUser tidak sesuai JSON: ", err);
      throw err;
    }
  }
}