import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from '../table/table.component';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { ExpensesServices, IExpense } from '../expenses.service';
import { ChartComponent, IChartData } from '../donut-chart/chart.component';
import { IncomesServices } from '../incomes.service';

@Component({
  selector: 'despesas-page',
  standalone: true,
  imports: [TableComponent, ModalComponent, ChartComponent, NgIf, NgFor],
  providers: [ExpensesServices, IncomesServices],
  templateUrl: './despesas-page.component.html',
  styleUrl: './despesas-page.component.css'
})

export class DespesasPageComponent implements OnInit {
  loading: boolean = false;
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
  rows:Array<ITableRows> = [];
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
  new_expense: IExpense = {
    name: "",
    ammount: 0.01,
    method: "money",
    date: this.today_date,
    category: null,
    due_date: this.today_date,
    hasInstallments: false,
    installments: null
  }

  changeNewExpense(type: "name" | "ammount" | "method" | "date" | "category" | "due_date" | "hasInstallments" | "installments", ev: any){
    switch (type) {
      case 'name':
        this.new_expense[type] = ev.target.value;
        break;
      case 'ammount':
        this.new_expense[type] = ev.target.value;
        break;
      case 'method':
        this.new_expense[type] = ev.target.value;
        break;
      case 'date':
        this.new_expense[type] = ev.target.value;
        break;
      case 'category':
        this.new_expense[type] = ev.target.value;
        break;
      case 'due_date':
        this.new_expense[type] = ev.target.value;
        break;
      case 'hasInstallments':
        this.new_expense[type] = ev.target.checked;
        break;
      case 'installments':
        this.new_expense[type] = ev.target.value;
        break;
    }
  }

  createExpense() {
    console.log(
      {

        "name": this.new_expense.name,
        "ammount": Number(this.new_expense.ammount),
        "method": this.new_expense.method,
        "category": null,
        "date": this.new_expense.date,
        "due_date": this.new_expense.due_date,
        "hasInstallments": this.new_expense.hasInstallments,
        "installments": this.new_expense.installments
      },
      {
        "name": "Pastel de frango",
        "ammount": 0.01,
        "method": "credit_card",
        "category": null,
        "date": "2024-02-23",
        "due_date": "2024-02-23",
        "hasInstallments": false,
        "installments": 0
      }
    );
    this.expensesServices.registerExpense({
      "name": this.new_expense.name,
      "ammount": Number(this.new_expense.ammount),
      "method": this.new_expense.method,
      "category": null,
      "date": this.new_expense.date,
      "due_date": this.new_expense.due_date,
      "hasInstallments": this.new_expense.hasInstallments,
      "installments": this.new_expense.installments ? this.new_expense.installments : 0
    }).then((result: any) => {
      this.expensesServices.getExpenses().then((result) => {
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
            ]
          }
        });
        this.chartData = result.map((row: any) => {
          return {
            color: "#f95738",
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
  update_expense: IExpense = {
    name: "",
    ammount: 0.01,
    method: "money",
    date: this.today_date,
    category: null,
    due_date: this.today_date,
    hasInstallments: false,
    installments: null
  }

  changeUpdateExpense(type: "name" | "ammount" | "method" | "date" | "category" | "due_date" | "hasInstallments" | "installments", ev: any){
    switch (type) {
      case 'name':
        this.update_expense[type] = ev.target.value;
        break;
      case 'ammount':
        this.update_expense[type] = ev.target.value;
        break;
      case 'method':
        this.update_expense[type] = ev.target.value;
        break;
      case 'date':
        this.update_expense[type] = ev.target.value;
        break;
      case 'category':
        this.update_expense[type] = ev.target.value;
        break;
      case 'due_date':
        this.update_expense[type] = ev.target.value;
        break;
      case 'hasInstallments':
        this.update_expense[type] = ev.target.checked;
        break;
      case 'installments':
        this.update_expense[type] = ev.target.value;
        break;
    }
  }

  // DELETE

  deleteExpense() {
    this.expensesServices.deleteExpense(this.selectable_array[0]).then((_) => {
      this.selectable_array = [];
      this.selectable_array_ids = "";
      this.selectable_array_names = "";
      this.selected = 0;
      this.expensesServices.getExpenses().then((result) => {
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
            ]
          }
        });
        this.chartData = result.map((row: any) => {
          return {
            color: "#f95738",
            data: Number(row.ammount),
            label: row.name
          }
        });
        this.open_delete_modal = false;
        this.loading = true;
      });
    })
  }

  constructor(private expensesServices: ExpensesServices) {

  }

  ngOnInit() {
    this.expensesServices.getExpenses().then((result) => {
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
          ]
        }
      });
      this.chartData = result.map((row: any) => {
        return {
          // color: ["#0d3b66", "#faf0ca", "#f4d35e", "#ee964b", "#f95738"][Math.floor(5 * Math.random())],]
          color: ["#f95738"],
          data: Number(row.ammount),
          label: row.name
        }
      });
      this.loading = true;
      // console.log(this.chartData)
    });
  }
}
