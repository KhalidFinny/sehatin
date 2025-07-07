import { Component } from "@angular/core";
import { HamburgerMenu } from "@shared/hamburger-menu/hamburger-menu.component";

@Component({
  selector: "shared-header",
  imports: [HamburgerMenu],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class Header {}