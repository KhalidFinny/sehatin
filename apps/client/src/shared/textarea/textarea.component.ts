import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "form-textarea",
  imports: [CommonModule, FormsModule],
  templateUrl: "./textarea.component.html",
  styleUrl: "./textarea.component.css",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true,
    },
  ],
})
export class Textarea implements ControlValueAccessor {
  @Input() info?: string;
  @Input() label: string = "";
  @Input() name!: string;
  @Input() placeholder: string = "";
  @Input() required: boolean = false;
  @Input() value: string = "";

  public length: number = 0;

  /**
   * @method onChange
   * @method onTouched
   * ControlValueAccessor hooks
   */
  public onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  countCharacterLength(value: string): void {
    this.value = value;
    this.length = value.length;
    this.onChange(value);
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