import { Component } from "@angular/core";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "pages-dasbor-admin",
  imports: [SidebarComponent],
  templateUrl: "./dasbor.component.html",
  styleUrl: "./dasbor.component.css",
})
export class DasborAdmin {
  userType: "admin" | "user" = "admin";

  currentDate: string = "";
  currentTime: string = "";

  constructor(private title: Title, private meta: Meta) {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.title.setTitle("Dasbor Admin | SEHATIN");
    this.meta.addTags([
      {
        name: "description",
        content: "Dasbor Admin",
      },
      {
        property: "og:title",
        content: "Dasbor Admin",
      },
      {
        property: "og:description",
        content: "Dasbor Admin",
      },
      {
        property: "og:image",
        content: "",
      },
      {
        property: "twitter:title",
        content: "Dasbor Admin",
      },
    ]);
  }

  updateDateTime() {
    const now = new Date();

    this.currentDate = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    this.currentTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}