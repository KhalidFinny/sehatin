import { CommonModule } from "@angular/common";
import { Component, ElementRef, forwardRef, HostListener, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "form-select",
  imports: [CommonModule, FormsModule],
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.css"],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor, OnInit {
  @Input() label?: string;
  @Input() name: string = "";
  @Input() options: Array<string | { value: string; label: string }> = [];
  @Input() required: boolean = false;
  @Input() selected?: string;
  @Input() value?: string;

  searchText: string = "";
  dropdownOpen: boolean = false;
  selectedLabel: string = "";

  /**
   * @method onChange
   * @method onTouched
   * ControlValueAccessor hooks
   */
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    this.setSelectedLabel();
  }

  toggleDropdown(event: MouseEvent): void {
    this.dropdownOpen = !this.dropdownOpen;
    event.stopPropagation();
  }

  selectOption(option: string | { value: string; label: string }): void {
    this.selected = this.getOptionValue(option);
    this.selectedLabel = this.getOptionLabel(option);
    this.dropdownOpen = false;
  }

  getOptionLabel(option: string | { value: string; label: string }): string {
    return typeof option === "string" ? option : option.label;
  }

  getOptionValue(option: string | { value: string; label: string }): string {
    return typeof option === "string" ? option : option.value;
  }

  filteredOptions(): (string | { value: string; label: string })[] {
    if (!this.searchText) return this.options;
    return this.options.filter((opt) => this.getOptionLabel(opt).toLowerCase().includes(this.searchText.toLowerCase()));
  }

  setSelectedLabel(): void {
    const match = this.options.find((opt) => this.getOptionValue(opt) === this.selected);
    this.selectedLabel = match ? this.getOptionLabel(match) : "";
  }

  @HostListener("document:click", ["$event"])
  clickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) this.dropdownOpen = false;
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