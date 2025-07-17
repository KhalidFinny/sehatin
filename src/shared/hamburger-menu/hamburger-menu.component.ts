import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "shared-hamburger-menu",
  imports: [],
  standalone: true,
  templateUrl: "./hamburger-menu.component.html",
  styleUrl: "./hamburger-menu.component.css",
})
export class HamburgerMenu {
  @Output() toggle = new EventEmitter<void>();
}