import { Component } from '@angular/core';
import { format } from 'date-fns';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from '../table/table.component';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { IExpense } from '../expenses.service';
import { ChartComponent, IChartData } from '../chart/chart.component';

@Component({
  selector: 'despesas-page',
  standalone: true,
  imports: [TableComponent, ModalComponent, ChartComponent, NgIf, NgFor],
  templateUrl: './despesas-page.component.html',
  styleUrl: './despesas-page.component.css'
})

export class DespesasPageComponent {
  // TABLE
  headers:Array<ITableHeader> = [
    {
      code: "id",
      name: "ID"
    },
    {
      code: "name",
      name: "Nome da transação",
      sortable: "string"
    },
    {
      code: "ammount",
      name: "Valor",
      sortable: "number"
    },
    {
      code: "date",
      name: "Data",
      data_type: "date",
      data_view: "badge",
      sortable: "number"
    },
  ]
  rows:Array<ITableRows> = [
    {
      id: "15",
      values: [
        {
          code: "name",
          value: "Suprimentos da Lanchonete"
        },
        {
          code: "ammount",
          value: 13.57
        },
        {
          code: "date",
          sortableValue: new Date(2024, 1, 29).getTime(),
          value: format(new Date(2024, 1, 29), "dd/MM/yyyy")
        },
      ]
    },
    {
      id: "11",
      values: [
        {
          code: "name",
          value: "Compra de jogo: Fallout 4"
        },
        {
          code: "ammount",
          value: 30.00
        },
        {
          code: "date",
          sortableValue: new Date(2024, 1, 25).getTime(),
          value: format(new Date(2024, 1, 25), "dd/MM/yyyy")
        },
      ]
    },
    {
      id: "9",
      values: [
        {
          code: "name",
          value: "Troca de penu do fusca"
        },
        {
          code: "ammount",
          value: 157.40
        },
        {
          code: "date",
          sortableValue: new Date(2024, 1, 20).getTime(),
          value: format(new Date(2024, 1, 20), "dd/MM/yyyy")
        },
      ]
    }
  ]
  footer_rows:Array<ITableFooter> = [
    {
      code: "tip",
      name: "Dica .: Sempre tente reservar um dinheiro para investir e/ou em reserva de capital rápido."
    },
  ]
  selectable_array: Array<string> = [];
  selectable_array_ids: string = "";
  selectable_array_names: string = "";
  selected: number = 0;

  chartData: Array<IChartData> = [
    {
      color: "#0d3b66",
      data: 13.5,
      label: "DESP.: 1"
    },
    {
      color: "#faf0ca",
      data: 13.5,
      label: "DESP.: 2"
    },
    {
      color: "#f4d35e",
      data: 13.5,
      label: "DESP.: 3"
    },
    {
      color: "#ee964b",
      data: 13.5,
      label: "DESP.: 4"
    },
    {
      color: "#f95738",
      data: 13.5,
      label: "DESP.: 5"
    },
  ]

  // MODALS
  open_register_modal = false;
  open_update_modal = false;
  open_delete_modal = false;
  today_date = format(new Date(), "yyyy-MM-dd");
  updateTables(value: any) {
    console.log(value);
    this.selectable_array = value;
    this.selected = value.length
  }
  openRegisterModal() {
    this.open_register_modal = true;
  }
  openUpdateModal() {
    this.selectable_array_names = this.rows.filter((row) => this.selectable_array.includes(row.id))
      .map((row) => row.values.find((row_value) => row_value.code === "name")?.value).join(", ");
    this.selectable_array_ids = this.selectable_array.join(", ");
    this.open_update_modal = true;
  }
  openDeleteModal() {
    this.selectable_array_names = this.rows.filter((row) => this.selectable_array.includes(row.id))
      .map((row) => row.values.find((row_value) => row_value.code === "name")?.value).join(", ");
    this.selectable_array_ids = this.selectable_array.join(", ");
    this.open_delete_modal = true;
  }
  updateModalState(type: "register" | "update" | "delete", data: boolean) {
    switch(type) {
      case "register":
        this.open_register_modal = data;
        break;
      case "update":
        this.open_update_modal = data;
        break;
      case "delete":
        this.open_delete_modal = data;
        break;
    }
  }

  //REGISTER
  new_expense: IExpense = {
    name: "",
    ammount: 0.01,
    method: "money",
    date: this.today_date,
    category: null,
    dueDate: this.today_date,
    hasInstallments: false,
    installments: null
  }

  changeNewExpense(type: "name" | "ammount" | "method" | "date" | "category" | "dueDate" | "hasInstallments" | "installments", ev: any){
    switch (type) {
      case 'name':
        console.log(ev.target.value);
        this.new_expense[type] = ev.target.value;
        break;
      case 'ammount':
        console.log(ev.target.value);
        this.new_expense[type] = ev.target.value;
        break;
      case 'method':
        console.log(ev.target.value);
        this.new_expense[type] = ev.target.value;
        break;
      case 'date':
        console.log(ev.target.value);
        this.new_expense[type] = ev.target.value;
        break;
      case 'category':
        console.log(ev.target.value);
        this.new_expense[type] = ev.target.value;
        break;
      case 'dueDate':
        console.log(ev.target.value);
        this.new_expense[type] = ev.target.value;
        break;
      case 'hasInstallments':
        console.log(ev.target.checked);
        this.new_expense[type] = ev.target.checked;
        break;
      case 'installments':
        console.log(ev.target.value);
        this.new_expense[type] = ev.target.value;
        break;
    }
  }

  //REGISTER
  update_expense: IExpense = {
    name: "",
    ammount: 0.01,
    method: "money",
    date: this.today_date,
    category: null,
    dueDate: this.today_date,
    hasInstallments: false,
    installments: null
  }

  changeUpdateExpense(type: "name" | "ammount" | "method" | "date" | "category" | "dueDate" | "hasInstallments" | "installments", ev: any){
    switch (type) {
      case 'name':
        console.log(ev.target.value);
        this.update_expense[type] = ev.target.value;
        break;
      case 'ammount':
        console.log(ev.target.value);
        this.update_expense[type] = ev.target.value;
        break;
      case 'method':
        console.log(ev.target.value);
        this.update_expense[type] = ev.target.value;
        break;
      case 'date':
        console.log(ev.target.value);
        this.update_expense[type] = ev.target.value;
        break;
      case 'category':
        console.log(ev.target.value);
        this.update_expense[type] = ev.target.value;
        break;
      case 'dueDate':
        console.log(ev.target.value);
        this.update_expense[type] = ev.target.value;
        break;
      case 'hasInstallments':
        console.log(ev.target.checked);
        this.update_expense[type] = ev.target.checked;
        break;
      case 'installments':
        console.log(ev.target.value);
        this.update_expense[type] = ev.target.value;
        break;
    }
  }
}
