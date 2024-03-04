import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from '../table/table.component';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { IIncome, IncomesServices } from '../incomes.service';
import { ChartComponent, IChartData } from '../chart/chart.component';

@Component({
  selector: 'receitas-page',
  standalone: true,
  imports: [TableComponent, ChartComponent, ModalComponent, NgIf],
  templateUrl: './receitas-page.component.html',
  styleUrl: './receitas-page.component.css'
})
export class ReceitasPageComponent implements OnInit {

  loading:boolean = true;
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
  selectable_array_ids: string = "";
  selectable_array_names: string = "";
  selected: number = 0;

  chartData: Array<IChartData> = [];

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

  // REGISTER
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
        this.new_income[type] = ev.target.value;
        break;
      case 'ammount':
        this.new_income[type] = ev.target.value;
        break;
      case 'method':
        this.new_income[type] = ev.target.value;
        break;
      case 'date':
        this.new_income[type] = ev.target.value;
        break;
      case 'category':
        this.new_income[type] = ev.target.value;
        break;
      case 'isInvestment':
        this.new_income[type] = ev.target.checked;
        break;
      case 'isLoan':
        this.new_income[type] = ev.target.checked;
        break;
    }
  }

  createIncome() {
    this.incomesServices.registerIncome({
      ammount: Number(this.new_income.ammount),
      category: null,
      date: this.new_income.date,
      isInvestment: this.new_income.isInvestment,
      isLoan: this.new_income.isLoan,
      method: this.new_income.method,
      name: this.new_income.name
    }).then((result: any) => {
      this.incomesServices.getIncomes().then((result) => {
        console.log(result)
        this.loading = true;
        this.rows = result.map((row: any) => {
          return {
            id: String(row.id),
            values: [
              {
                code: "name",
                value: row.name
              },
              {
                code: "ammount",
                value: Number(row.ammount)
              },
              {
                code: "date",
                sortableValue: new Date(row.date).getTime(),
                value: format(new Date(row.date), "dd/MM/yyyy")
              },
              {
                code: "isInvestment",
                sortableValue: row.isInvestment ? 1 : 0,
                value: row.isInvestment ? "Sim" : "Não"
              },
            ]
          }
        });
        this.chartData = result.map((row: any) => {
          return {
            color: "#136f63",
            data: Number(row.ammount),
            label: row.name
          }
        });
        this.open_register_modal = false;
        this.loading = false;
      });
    });

  }

  // UPDATE
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
        this.update_income[type] = ev.target.value;
        break;
      case 'ammount':
        this.update_income[type] = ev.target.value;
        break;
      case 'method':
        this.update_income[type] = ev.target.value;
        break;
      case 'date':
        this.update_income[type] = ev.target.value;
        break;
      case 'category':
        this.update_income[type] = ev.target.value;
        break;
      case 'isInvestment':
        this.update_income[type] = ev.target.checked;
        break;
      case 'isLoan':
        this.update_income[type] = ev.target.checked;
        break;
    }
  }

  constructor(private incomesServices: IncomesServices) {

  }

  ngOnInit() {
    this.incomesServices.getIncomes().then((result: any) => {
      console.log(result)
      this.rows = result.map((row: any) => {
        return {
          id: String(row.id),
          values: [
            {
              code: "name",
              value: row.name
            },
            {
              code: "ammount",
              value: Number(row.ammount)
            },
            {
              code: "date",
              sortableValue: new Date(row.date).getTime(),
              value: format(new Date(row.date), "dd/MM/yyyy")
            },
            {
              code: "isInvestment",
              sortableValue: row.isInvestment ? 1 : 0,
              value: row.isInvestment ? "Sim" : "Não"
            },
          ]
        }
      });
      this.chartData = result.map((row: any) => {
        return {
          // color: ["#0d3b66", "#faf0ca", "#f4d35e", "#ee964b", "#f95738"][Math.floor(5 * Math.random())],]
          color: "#136f63",
          data: Number(row.ammount),
          label: row.name
        }
      });
      this.loading = true;
      // console.log(this.chartData)
    });
  }
}
