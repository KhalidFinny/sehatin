import { Component, Input, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;
  link?: string;
  action?: () => void;
  subMenu?: SidebarMenuItem[]; // Tambahan untuk sub menu
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
export class SidebarComponent implements OnDestroy {
  @Input() config: SidebarConfig = {
    userType: "user",
    userName: "User Name",
    userEmail: "user@email.com",
    userInitial: "U",
  };

  // Input sederhana untuk user type saja
  @Input() userType: "admin" | "user" = "user";

  // Property untuk mengelola sub menu yang terbuka
  openSubMenuId: string | null = null;

  // Timeout untuk delay closing sub-menu
  private closeTimeout: any = null;

  constructor(private authService: AuthService) {}

  // Menu templates untuk admin dan user dengan Font Awesome icons
  private adminMenuItems: SidebarMenuItem[] = [
    {
      id: "dashboard",
      label: "Dasbor",
      icon: "fas fa-tachometer-alt",
    },
    {
      id: "user-management",
      label: "Manajemen User",
      icon: "fas fa-users",
      subMenu: [
        {
          id: "user-list",
          label: "Daftar User",
          icon: "fas fa-list",
        },
        {
          id: "add-user",
          label: "Tambah User",
          icon: "fas fa-user-plus",
        },
        {
          id: "user-roles",
          label: "Role User",
          icon: "fas fa-user-shield",
        },
      ],
    },
    {
      id: "content-management",
      label: "Manajemen Konten",
      icon: "fas fa-file-alt",
      subMenu: [
        {
          id: "articles",
          label: "Artikel",
          icon: "fas fa-newspaper",
        },
        {
          id: "categories",
          label: "Kategori",
          icon: "fas fa-tags",
        },
        {
          id: "media",
          label: "Media",
          icon: "fas fa-images",
        },
      ],
    },
    {
      id: "analytics",
      label: "Analitik",
      icon: "fas fa-chart-bar",
      subMenu: [
        {
          id: "user-analytics",
          label: "Analitik User",
          icon: "fas fa-chart-line",
        },
        {
          id: "content-analytics",
          label: "Analitik Konten",
          icon: "fas fa-chart-pie",
        },
        {
          id: "reports",
          label: "Laporan",
          icon: "fas fa-file-chart",
        },
      ],
    },
    {
      id: "settings",
      label: "Pengaturan",
      icon: "fas fa-cog",
      subMenu: [
        {
          id: "general-settings",
          label: "Pengaturan Umum",
          icon: "fas fa-sliders-h",
        },
        {
          id: "security",
          label: "Keamanan",
          icon: "fas fa-shield-alt",
        },
        {
          id: "backup",
          label: "Backup & Restore",
          icon: "fas fa-database",
        },
      ],
    },
  ];

  private userMenuItems: SidebarMenuItem[] = [
    {
      id: "dashboard",
      label: "Dasbor",
      icon: "fas fa-tachometer-alt",
    },
    {
      id: "health",
      label: "Kesehatan",
      icon: "fas fa-heartbeat",
      subMenu: [
        {
          id: "health-records",
          label: "Rekam Medis",
          icon: "fas fa-notes-medical",
        },
        {
          id: "appointments",
          label: "Janji Temu",
          icon: "fas fa-calendar-check",
        },
        {
          id: "medications",
          label: "Obat-obatan",
          icon: "fas fa-pills",
        },
      ],
    },
    {
      id: "consultation",
      label: "Konsultasi",
      icon: "fas fa-comments",
      subMenu: [
        {
          id: "chat-doctor",
          label: "Chat Dokter",
          icon: "fas fa-comment-medical",
        },
        {
          id: "video-call",
          label: "Video Call",
          icon: "fas fa-video",
        },
        {
          id: "consultation-history",
          label: "Riwayat Konsultasi",
          icon: "fas fa-history",
        },
      ],
    }
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

  // Method untuk toggle sub menu
  toggleSubMenu(item: SidebarMenuItem) {
    if (this.openSubMenuId === item.id) {
      this.openSubMenuId = null;
    } else {
      this.openSubMenuId = item.id;
    }
  }

  // Method untuk hover sub menu
  onMenuHover(item: SidebarMenuItem) {
    // Clear any existing timeout
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    if (item.subMenu && item.subMenu.length > 0) {
      this.openSubMenuId = item.id;
    }
  }

  // Method untuk leave sub menu
  onMenuLeave() {
    // Clear any existing timeout first
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }

    // Add delay before closing sub-menu
    this.closeTimeout = setTimeout(() => {
      this.openSubMenuId = null;
      this.closeTimeout = null;
    }, 300); // 300ms delay for smooth movement
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
    if (item.subMenu && item.subMenu.length > 0) {
      this.toggleSubMenu(item);
      return;
    }

    if (item.action) item.action();
    console.log("Menu clicked:", item.id);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }
}
