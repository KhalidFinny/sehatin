import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "@services/auth.service";

export type SidebarMenuItem = {
  id: string;
  label: string;
  icon: string;
  link?: string;
  action?: () => void;
  subMenu?: SidebarMenuItem[];
}

export type SidebarConfig = {
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
export class Sidebar implements OnDestroy, OnInit {
  @Input() config: SidebarConfig = {
    userType: "user",
    userName: "User Name",
    userEmail: "user@email.com",
    userInitial: "U",
  };

  @Input() userType: "admin" | "user" = "user";
  @Output() close = new EventEmitter<boolean>();

  public isOpen: boolean = true;
  public openSubMenuId: string | null = null;
  private closeTimeout: number = 0;
  
  private adminMenuItems: SidebarMenuItem[] = [{
    id: "dashboard",
    label: "Dasbor",
    icon: "fas fa-tachometer-alt",
    link: "/admin/dasbor",
  },
  {
    id: "analytics",
    label: "Analitik",
    icon: "fas fa-chart-bar",
    subMenu: [{
      id: "kecamatan-analytics",
      label: "Kecamatan",
      icon: "fas fa-chart-line",
      link: "/admin/analitik/kecamatan",
    },
    {
      id: "analytics-pengguna",
      label: "Pengguna",
      icon: "fas fa-user-doctor",
      link: "/admin/analitik/pengguna",
    }],
  }];

  private userMenuItems: SidebarMenuItem[] = [{
    id: "dashboard",
    label: "Dasbor",
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
  }];
  
  constructor(public authService: AuthService, public router: Router) {}

  ngOnDestroy(): void {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
  }

  ngOnInit(): void {
    for (const item of this.menuItems) {
      if (item.subMenu && item.subMenu.some(sub => this.router.url.startsWith(sub.link!))) {
        this.openSubMenuId = item.id;
        break;
      }
    }
  }

  get configUserType(): SidebarConfig {
    const type = this.userType || this.config.userType || "user";
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

  get menuItems(): SidebarMenuItem[] {
    const type = this.configUserType.userType;
    return type === "admin" ? this.adminMenuItems : this.userMenuItems;
  }

  public onLogout(): void {
    return this.authService.logout();
  }

  public closeSidebar(): void {
    this.isOpen = false;
    this.close.emit();
  }

  public onMenuClick(item: SidebarMenuItem): void {
    if (item.subMenu && item.subMenu.length > 0) {
      this.openSubMenuId = this.openSubMenuId === item.id ? null : item.id
      return;
    }

    if (item.action instanceof Function) item.action();
  }
}