import { Component } from '@angular/core';
import { format } from 'date-fns';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from '../table/table.component';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { IIncome } from '../incomes.service';

@Component({
  selector: 'receitas-page',
  standalone: true,
  imports: [TableComponent, ModalComponent, NgIf],
  templateUrl: './receitas-page.component.html',
  styleUrl: './receitas-page.component.css'
})
export class ReceitasPageComponent {
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
    {
      code: "isInvestment",
      name: "É investimento ?",
      data_type: "string",
      data_view: "badge",
      sortable: "string"
    },
  ]
  rows:Array<ITableRows> = [
    {
      id: "15",
      values: [
        {
          code: "name",
          value: "Salário"
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
        {
          code: "isInvestment",
          sortableValue: 1,
          value: "Não"
        },
      ]
    },
    {
      id: "15",
      values: [
        {
          code: "name",
          value: "Salário"
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
        {
          code: "isInvestment",
          sortableValue: 1,
          value: "Sim"
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
  selected: number = 0;

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
    console.log(this.selectable_array[0]);
    this.open_update_modal = true;
  }
  openDeleteModal() {
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
  new_income: IIncome = {
    name: "",
    ammount: 0.01,
    method: "money",
    date: this.today_date,
    category: null,
    isInvestment: false,
    isLoan: false,
  }

  changeNewIncome(type: "name" | "ammount" | "method" | "date" | "category" | "isInvestment" | "isLoan", ev: any){
    switch (type) {
      case 'name':
        console.log(ev.target.value);
        this.new_income[type] = ev.target.value;
        break;
      case 'ammount':
        console.log(ev.target.value);
        this.new_income[type] = ev.target.value;
        break;
      case 'method':
        console.log(ev.target.value);
        this.new_income[type] = ev.target.value;
        break;
      case 'date':
        console.log(ev.target.value);
        this.new_income[type] = ev.target.value;
        break;
      case 'category':
        console.log(ev.target.value);
        this.new_income[type] = ev.target.value;
        break;
      case 'isInvestment':
        console.log(ev.target.checked);
        this.new_income[type] = ev.target.checked;
        break;
      case 'isLoan':
        console.log(ev.target.checked);
        this.new_income[type] = ev.target.checked;
        break;
    }
  }

  //REGISTER
  update_income: IIncome = {
    name: "",
    ammount: 0.01,
    method: "money",
    date: this.today_date,
    category: null,
    isInvestment: false,
    isLoan: false,
  }

  changeUpdateIncome(type: "name" | "ammount" | "method" | "date" | "category" | "isInvestment" | "isLoan", ev: any){
    switch (type) {
      case 'name':
        console.log(ev.target.value);
        this.update_income[type] = ev.target.value;
        break;
      case 'ammount':
        console.log(ev.target.value);
        this.update_income[type] = ev.target.value;
        break;
      case 'method':
        console.log(ev.target.value);
        this.update_income[type] = ev.target.value;
        break;
      case 'date':
        console.log(ev.target.value);
        this.update_income[type] = ev.target.value;
        break;
      case 'category':
        console.log(ev.target.value);
        this.update_income[type] = ev.target.value;
        break;
      case 'isInvestment':
        console.log(ev.target.checked);
        this.update_income[type] = ev.target.checked;
        break;
      case 'isLoan':
        console.log(ev.target.checked);
        this.update_income[type] = ev.target.checked;
        break;
    }
  }
}
