import { Component, Input, Output, EventEmitter, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "form-input",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() name!: string;
  @Input() label!: string;
  @Input() value: string = "";
  @Input() type: string = "text";
  @Input() required: boolean = false;
  @Input() info?: string;
  @Input() icon?: string;
  @Input() placeholder?: string;
  @Output() valueChange = new EventEmitter<string>();

  private onChange = (value: string) => {};
  private onTouched = () => {};

  showPassword = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  public handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.type === "number") input.value = input.value.replace(/[^0-9.,]/g, "").replace(/(,.*?),/g, "$1");
    else if (this.type === "text") input.value = input.value.replace(/[^a-zA-Z0-9\s.,?!:;'"\-()\/]/g, "");

    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  public onWheel(event: WheelEvent): void {
    if (this.type === 'number') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  get labelString(): string {
    if (typeof this.label === 'string') return this.label;
    if (this.label && typeof this.label === 'object' && 'text' in this.label) return (this.label as any).text;
    return '[Label tidak valid]';
  }
}
