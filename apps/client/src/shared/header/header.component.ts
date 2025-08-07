import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CURRENT_USER } from "@constants/local-storage-keys";
import { Text } from "@helpers/text";
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
  @Input() title: string = "";
  public name: string = "";
  public role: "admin" | "user" = "user";
  public isSidebarOpen: boolean = false;
  public truncateText = Text.truncateText;

  constructor(private authService: AuthService, private router: Router, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;

    if (currentUser !== null) {
      this.name = currentUser.name;
      this.role = currentUser.role;
    }

    this.sidebarService.sidebarOpen.subscribe((state) => {
      this.isSidebarOpen = state;
    });
  }

  get isAuthenticated(): boolean {
    return typeof window !== "undefined" && localStorage.getItem(CURRENT_USER) !== null;
  }

  get isDashboardPage(): boolean {
    if (typeof window === "undefined") return false;
    return window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/pengguna');
  }

  goToDashboard() {
    this.router.navigate([this.role === "admin" ? "/admin/dasbor" : "/pengguna/dasbor"]);
  }

  toggleSidebar() {
    this.sidebarService.sidebarOpenSubject.next(!this.sidebarService.isSidebarOpen);
  }
}