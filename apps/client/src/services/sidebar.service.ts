import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SidebarService {
  readonly sidebarOpenSubject = new BehaviorSubject<boolean>(true);
  readonly sidebarOpen = this.sidebarOpenSubject.asObservable();

  toggleSidebar(): void {
    const current = this.sidebarOpenSubject.value;
    this.sidebarOpenSubject.next(!current);
  }

  setSidebarState(open: boolean): void {
    this.sidebarOpenSubject.next(open);
  }

  get isSidebarOpen(): boolean {
    return this.sidebarOpenSubject.value;
  }
}