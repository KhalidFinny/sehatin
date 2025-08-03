import { Component, EventEmitter, forwardRef, Input as InputCore, Output } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "form-input",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  /**
   * @prop name, label, value, type, required, info, icon, placeholder, variant
   * @type string
   * @description Props untuk input.
   */
  @InputCore() icon?: string;
  @InputCore() info?: string;
  @InputCore() label!: string;
  @InputCore() name!: string;
  @InputCore() placeholder?: string;
  @InputCore() required: boolean = false;
  @InputCore() type: "text" | "date" | "email" | "file" | "password" | "number" = "text";
  @InputCore() value: string = "";
  @InputCore() variant: "auth" | "form" = "form";
  @Output() valueChange = new EventEmitter<string>();

  /**
   * @method onChange
   * @method onTouched
   * ControlValueAccessor hooks
   */
  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  /**
   * @returns boolean
   * @var showPassword
   * @description Internal states
   */
  showPassword: boolean = false;

  // --- Getters ---
  get labelString(): string {
    if (typeof this.label === "string") return this.label;
    return "[Label tidak valid]";
  }

  // --- Public Methods ---
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.type === "number") {
      input.value = input.value.replace(/[^0-9.,]/g, "").replace(/(,.*?),/g, "$1");
    } else if (this.type === "text") {
      input.value = input.value.replace(/[^a-zA-Z0-9\s.,?!:;'"\-()\/]/g, "");
    }

    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  onWheel(event: WheelEvent): void {
    if (this.type === "number") {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  }

  // --- ControlValueAccessor ---
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}