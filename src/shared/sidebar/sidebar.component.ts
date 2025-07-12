import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;
  link?: string;
  action?: () => void;
}

export interface SidebarConfig {
  userType: "admin" | "user";
  userName: string;
  userEmail: string;
  userInitial: string;
}

@Component({
  selector: "app-sidebar",
  imports: [CommonModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  @Input() config: SidebarConfig = {
    userType: "user",
    userName: "User Name",
    userEmail: "user@email.com",
    userInitial: "U",
  };

  // Input sederhana untuk user type saja
  @Input() userType: "admin" | "user" = "user";

  constructor(private authService: AuthService) {}

  // Menu templates untuk admin dan user dengan Font Awesome icons
  private adminMenuItems: SidebarMenuItem[] = [
    {
      id: "menu-1",
      label: "Menu Admin 1",
      icon: "fas fa-users",
    },
    {
      id: "menu-2",
      label: "Menu Admin 2",
      icon: "fas fa-chart-bar",
    },
    {
      id: "menu-3",
      label: "Menu Admin 3",
      icon: "fas fa-cog",
    },
    {
      id: "menu-4",
      label: "Menu Admin 4",
      icon: "fas fa-database",
    },
    {
      id: "menu-5",
      label: "Menu Admin 5",
      icon: "fas fa-shield-alt",
    },
  ];

  private userMenuItems: SidebarMenuItem[] = [
    {
      id: "menu-1",
      label: "Menu User 1",
      icon: "fas fa-user",
    },
    {
      id: "menu-2",
      label: "Menu User 2",
      icon: "fas fa-heart",
    },
    {
      id: "menu-3",
      label: "Menu User 3",
      icon: "fas fa-comments",
    },
    {
      id: "menu-4",
      label: "Menu User 4",
      icon: "fas fa-book",
    },
    {
      id: "menu-5",
      label: "Menu User 5",
      icon: "fas fa-bell",
    },
  ];

  getCurrentConfig(): SidebarConfig {
    // Jika config diberikan, gunakan itu
    if (this.config && this.config.userName) {
      return this.config;
    }

    // Jika tidak, buat config berdasarkan userType
    const type = this.userType || "user";
    return {
      userType: type,
      userName: type === "admin" ? "Admin Sehatin" : "User Sehatin",
      userEmail: type === "admin" ? "admin@sehatin.com" : "user@sehatin.com",
      userInitial: type === "admin" ? "A" : "U",
    };
  }

  get menuItems(): SidebarMenuItem[] {
    // Gunakan userType input jika config tidak diberikan
    const type = this.getCurrentConfig().userType;
    return type === "admin" ? this.adminMenuItems : this.userMenuItems;
  }

  closeSidebar() {
    // Logic untuk menutup sidebar di mobile
    const overlay = document.querySelector(".sidebar-overlay");
    const sidebar = document.querySelector(".sidebar");

    if (overlay && sidebar) {
      overlay.classList.add("hidden");
      sidebar.classList.remove("translate-x-0");
      sidebar.classList.add("-translate-x-full");
    }
  }

  onMenuClick(item: SidebarMenuItem) {
    if (item.action) item.action();
    // Tambahkan logic routing atau action lainnya di sini
    console.log("Menu clicked:", item.id);
  }

  onLogout() {
    this.authService.logout();
  }
}