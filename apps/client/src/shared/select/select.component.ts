import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "form-select",
  imports: [CommonModule, FormsModule],
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.css"],
  standalone: true,
})
export class Select implements OnInit {
  @Input() label?: string;
  @Input() name: string = "";
  @Input() options: Array<string | { value: string; label: string }> = [];
  @Input() required: boolean = false;
  @Input() selected?: string;
  @Input() value?: string;

  searchText: string = "";
  dropdownOpen: boolean = false;
  selectedLabel: string = "";

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
}