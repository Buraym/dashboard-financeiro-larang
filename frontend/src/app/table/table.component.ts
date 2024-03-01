import { NgFor, NgIf } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

export interface ITableHeader {
  name: string;
  code: string;
  sortable?: "number" | "number_desc" | "string" | "string_desc";
}

export interface ITableFooter {
  name: string;
  code: string;
}

export interface ITableValues {
  value: any;
  code: string;
}

export interface ITableRows {
  id: string
  name: string;
  code: string;
  values: Array<ITableValues>
}

@Component({
  selector: 'table-component',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() title!: string;
  @Input() headers!: Array<ITableHeader>;
  @Input({ transform: booleanAttribute }) fixed_header!: boolean;
  @Input() rows!: Array<ITableRows>;
  @Input() filtered_rows!: Array<ITableRows>;
  @Input() footer_rows!: Array<ITableFooter>;
}
