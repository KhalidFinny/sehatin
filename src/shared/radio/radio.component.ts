import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "shared-radio",
  imports: [CommonModule, FormsModule],
  templateUrl: "./radio.component.html",
  styleUrl: "./radio.component.css",
})
export class RadioComponent {
  @Input() name: string = "";
  @Input() label: string = "";
  @Input() required: boolean = false;
  @Input() options: { value: string | number; label: string }[] = [];
  @Input() model: string | number = "";
}