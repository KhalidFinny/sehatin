import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { SidebarService } from "@services/sidebar.service";

@Component({
  imports: [CommonModule, RouterModule],
  selector: "shared-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class Header implements OnInit {
  @Input() title: string | unknown;
  public isAuthenticated = false;
  public email: string = "";
  public role: "admin" | "user" = "user";
  public isSidebarOpen: boolean = false;
  public showMenu: boolean = false;

  constructor(private authService: AuthService, private router: Router, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.router.url.startsWith("/pengguna") || this.router.url.startsWith("/admin");

    const currentUser = this.authService.getCurrentUser();
    if (currentUser !== null) {
      this.email = currentUser.email;
      this.role = currentUser.role;
    }

    this.sidebarService.sidebarOpen.subscribe((state) => {
      this.isSidebarOpen = state;
    });
  }

  get getLocalStorage(): boolean {
    return typeof window !== "undefined" && localStorage.getItem("currentUser") !== null;
  }

  get profileRoute(): string {
    return this.role === "admin" ? '/admin/profil' : '/pengguna/profil';
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}