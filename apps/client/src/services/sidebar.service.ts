import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SidebarService {
  readonly sidebarOpenSubject = new BehaviorSubject<boolean>(this.isDashboardPage());
  readonly sidebarOpen = this.sidebarOpenSubject.asObservable();

  toggleSidebar(): void {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  setSidebarState(open: boolean): void {
    this.sidebarOpenSubject.next(open);
  }

  get isSidebarOpen(): boolean {
    return this.sidebarOpenSubject.value;
  }

  private isDashboardPage(): boolean {
    if (typeof window === "undefined") return false;
    return window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/pengguna");
  }
}