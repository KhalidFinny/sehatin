import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SidebarService {
  readonly sidebarOpenSubject = new BehaviorSubject<boolean>(true);
  readonly sidebarOpen = this.sidebarOpenSubject.asObservable();

  toggleSidebar() {
    const current = this.sidebarOpenSubject.value;
    this.sidebarOpenSubject.next(!current);
  }

  setSidebarState(open: boolean) {
    this.sidebarOpenSubject.next(open);
  }

  get isSidebarOpen(): boolean {
    return this.sidebarOpenSubject.value;
  }
}