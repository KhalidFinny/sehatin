import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "shared-table",
  imports: [CommonModule],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.css",
})
export class Table {
  @Input() headers: string[] = [];
  @Input() rows: string[] = [];
  @Input() sortable: string[] = [];

  isSortable(header: string): boolean {
    return this.sortable.map((sub) => sub.toLowerCase()).includes(header.toLowerCase());
  }
}