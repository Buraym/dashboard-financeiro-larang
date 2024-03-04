import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, booleanAttribute } from '@angular/core';

export interface ITableHeader {
  name: string;
  code: string;
  data_type?: "number" | "string" | "date";
  data_view?: "normal" | "badge";
  sortable?: false | "id" | "number" | "number_desc" | "string" | "string_desc";
}

export interface ITableFooter {
  name: string;
  code: string;
}

export interface ITableValues {
  value: any;
  sortableValue?: any;
  code: string;
}

export interface ITableRows {
  id: string
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
  @Input({ transform: booleanAttribute }) selectable!: boolean;
  @Input() selectable_array!: Array<string>;
  @Output() selectable_array_parent = new EventEmitter<Array<string>>();

  sortByHeader(header_code: string){
    let chosen_header = this.headers.find((header) => header.code === header_code);
    let chosen_sorted: "id" | "number" | "number_desc" | "string" | "string_desc" = "id";
    if (String(chosen_header?.sortable) === "number") {
      chosen_sorted = "number_desc";
    } else if (String(chosen_header?.sortable) === "number_desc") {
      chosen_sorted = "number";
    }

    if (String(chosen_header?.sortable) === "string") {
      chosen_sorted = "string_desc";
    } else if (String(chosen_header?.sortable) === "string_desc") {
      chosen_sorted = "string";
    }
    let sorted_list = this.rows.sort((a, b) => {
      let a_value = a.values.find((value) => value.code === chosen_header?.code);
      let b_value = b.values.find((value) => value.code === chosen_header?.code);
      if (["number", "number_desc"].includes(chosen_sorted)) {
        let a_final_val = chosen_header?.data_type === "date" ? Number(a_value?.sortableValue) : Number(a_value?.value);
        let b_final_val = chosen_header?.data_type === "date" ? Number(b_value?.sortableValue) : Number(b_value?.value);
        // @ts-ignore
        return chosen_sorted === "number_desc" ? a_final_val - b_final_val : b_final_val - a_final_val;
      } else if (["string", "string_desc"].includes(chosen_sorted)) {
        return chosen_sorted === "string_desc" ?
          String(b_value?.value).localeCompare(String(a_value?.value), "pt", { sensitivity: 'base' }) :
            String(a_value?.value).localeCompare(String(b_value?.value), "pt", { sensitivity: 'base' });
      } else {
        return String(a.id).localeCompare(String(b.id), "pt", { sensitivity: 'base' });
      }
    });
    this.rows = sorted_list;
    this.headers = this.headers.map((h) => {
      if (h.code === header_code) {
        h.sortable = chosen_sorted;
      }
      return h;
    })
  }

  isChecked(id: string){
    return this.selectable_array.includes(id) ? true : false;
  }

  selectRowById(id: string) {
    if (this.selectable_array.includes(id)) {
      const updated_arr = this.selectable_array.filter((row) => row !== id);
      this.selectable_array = updated_arr;
      this.selectable_array_parent.emit(updated_arr);
    } else {
      const updated_arr = [...this.selectable_array, id];
      this.selectable_array = updated_arr;
      this.selectable_array_parent.emit(updated_arr);
    }
  }

  isAllChecked(){
    return this.selectable_array.length === this.rows.length ? true : false;
  }

  toggleAllChecked(){
    if (this.selectable_array.length > 0) {
      this.selectable_array = [];
      this.selectable_array_parent.emit([]);
    } else {
      const updated_arr = this.rows.map((row) => row.id);
      this.selectable_array = updated_arr;
      this.selectable_array_parent.emit(updated_arr);
    }
  }

  ngOnChanges(changes: SimpleChange) {
    let actual_value = changes.currentValue;
    console.log(changes);
    if (actual_value) {
      this.rows = actual_value;
    }
  }
}
