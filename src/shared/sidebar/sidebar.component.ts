import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "@services/auth.service";

type SidebarMenuItem = {
  id: string;
  label: string;
  icon: string;
  link?: string;
  action?: () => void;
  subMenu?: SidebarMenuItem[];
}

type SidebarConfig = {
  userType: "admin" | "user";
  userName: string;
  userEmail: string;
  userInitial: string;
}

@Component({
  selector: "shared-sidebar",
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class Sidebar implements OnDestroy {
  @Input() config: SidebarConfig = {
    userType: "user",
    userName: "User Name",
    userEmail: "user@email.com",
    userInitial: "U",
  };

  /**
   * @var userType
   * Tipe pengguna.
   */
  @Input() userType: "admin" | "user" = "user";

  @Output() close = new EventEmitter<boolean>();

  /**
   * @var openSubMenuId
   * ID sub-menu yang terbuka.
   */
  openSubMenuId: string | null = null;

  /**
   * @var closeTimeout
   * Timeout untuk menutup sub-menu.
   * NOTE: Jangan sesekali menggunakan any sebagai tipe data.
   */
  private closeTimeout: number = 0;

  isOpen: boolean = true;

  constructor(private authService: AuthService) {}

  /**
   * @var adminMenuItems
   * Menu item untuk admin.
   */
  private adminMenuItems: SidebarMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
      link: "/admin/dasbor",
    },
    {
      id: "analytics",
      label: "Analitik",
      icon: "fas fa-chart-bar",
      subMenu: [
        {
          id: "kecamatan-analytics",
          label: "Analitik Kecamatan",
          icon: "fas fa-chart-line",
          link: "/admin/kecamatan",
        },
        {
          id: "analytics-pengguna",
          label: "Analitik Pengguna",
          icon: "fas fa-user-doctor",
          link: "/admin/analitik/pengguna",
        },
      ],
    },
  ];

  /**
   * @var userMenuItems
   * Item menu untuk pengguna.
   */
  private userMenuItems: SidebarMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
      link: "/pengguna/dasbor",
    },
    {
      id: "health-records",
      label: "Rekap Kesehatan",
      icon: "fas fa-user-doctor",
      link: "/pengguna/rekap-kesehatan",
    },
    {
      id: "ncd-screening",
      label: "Skrining PTM",
      icon: "fa-solid fa-heart-pulse",
      link: "/pengguna/skrining-ptm",
    }
  ];

  /**
   * @returns void
   * Fungsi untuk menutup sidebar setelah beberapa detik.
   */
  ngOnDestroy(): void {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
  }

  /**
   * @returns SidebarConfig
   * Getter untuk mengambil konfigurasi sidebar berdasarkan tipe pengguna.
   */
  getCurrentConfig(): SidebarConfig {
    const type = this.userType || this.config?.userType || "user";
    const name = type === "admin" ? "Admin Sehatin" : "User Sehatin";
    const email = type === "admin" ? "admin@sehatin.com" : "user@sehatin.com";
    const initial = type === "admin" ? "A" : "U";

    return {
      userType: type,
      userName: name,
      userEmail: email,
      userInitial: initial,
    };
  }

  /**
   * @returns SidebarMenuItem[]
   * Getter untuk mengambil menu berdasarkan tipe pengguna.
   */
  get menuItems(): SidebarMenuItem[] {
    const type = this.getCurrentConfig().userType;
    return type === "admin" ? this.adminMenuItems : this.userMenuItems;
  }

  /**
   * @param item SidebarMenuItem
   * @returns void
   * Fungsi untuk membuka dan menutup sub-menu berdasarkan item yang diklik.
   */
  toggleSubMenu(item: SidebarMenuItem): void {
    this.openSubMenuId = this.openSubMenuId === item.id ? null : item.id;
  }

  /**
   * @returns void
   * Fungsi untuk menutup sidebar.
   */
  closeSidebar(): void {
    this.isOpen = false;
    this.close.emit();
  }

  /**
   * @returns void
   * Fungsi untuk membuka sidebar.
   */
  openSidebar(): void {
    this.isOpen = true;
  }

  toggleSidebar():void {
    this.isOpen = !this.isOpen;
  }

  /**
   * @param item
   * @returns void
   * Fungsi untuk mengelola klik menu.
   */
  onMenuClick(item: SidebarMenuItem): void {
    if (item.subMenu && item.subMenu.length > 0) {
      this.toggleSubMenu(item);
      return;
    }

    if (item.action instanceof Function) item.action();
  }

  /**
   * @returns void
   * Fungsi untuk melakukan logout.
   */
  onLogout(): void {
    this.authService.logout();
  }
}
