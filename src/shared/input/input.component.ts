import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "form-input",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent {
  @Input() name!: string;
  @Input() label!: string;
  @Input() value: string = "";
  @Input() type: string = "text";
  @Input() required: boolean = false;
  @Input() info?: string;
  @Input() icon?: string;

  public handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.type === "number") input.value = input.value.replace(/[^0-9.,]/g, "").replace(/(,.*?),/g, "$1");
    else if (this.type === "text") input.value = input.value.replace(/[^a-zA-Z0-9\s.,?!:;'"\-()\/]/g, "");

    this.value = input.value;
  }
}