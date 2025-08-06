import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel } from "@angular/forms";

@Component({
  selector: "form-checkbox",
  imports: [CommonModule, FormsModule],
  templateUrl: "./checkbox.component.html",
  styleUrl: "./checkbox.component.css",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
})
export class Checkbox implements ControlValueAccessor {
  @Input() label: string = ""; // Untuk judul tampilannya.
  @Input() model!: NgModel;
  @Input() name: string[] = []; // Model yang akan diisi.
  @Input() options: string[] = []; // Nilai-nilai pilihan.
  @Input() required: boolean = false;

  public onChange: (value: string[]) => void = () => {};
  public onTouched: () => void = () => {};

  toggleChoices(value: string): void {
    const index = this.name.indexOf(value);
    if (index === -1) this.name.push(value);
    else this.name.splice(index, 1);

    this.onChange(this.name);
    this.onTouched();
  }

  writeValue(name: string[] | null): void {
    this.name = name ?? [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}