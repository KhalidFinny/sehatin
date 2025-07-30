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
  @Input() rows: string[][] = [];
  @Input() sortable: string[] = [];

  isSortable(header: string): boolean {
    return this.sortable.map((sub) => sub.toLowerCase()).includes(header.toLowerCase());
  }

  sortState: { index: number; asc: boolean } = { index: -1, asc: true };

  sortByColumn(index: number): void {
    const ascending = this.sortState.index === index ? !this.sortState.asc : true;
    this.sortState = { index, asc: ascending };

    this.rows = [...this.rows].sort((a, b) => {
      const valA = a[index].toLowerCase() || "";
      const valB = b[index].toLowerCase() || "";
      return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }
}