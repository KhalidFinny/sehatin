import { Component } from "@angular/core";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";

@Component({
  selector: "pages-dasbor-pengguna",
  imports: [SidebarComponent],
  templateUrl: "./dasbor.component.html",
  styleUrl: "./dasbor.component.css",
})
export class DasborPengguna {
  userType: 'admin' | 'user' = 'user';

  currentDate: string = '';
  currentTime: string = '';

  constructor() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.currentTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}
