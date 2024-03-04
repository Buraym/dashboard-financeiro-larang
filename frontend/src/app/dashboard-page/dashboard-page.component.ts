import { AfterRenderPhase, Component, afterRender } from '@angular/core';
import { AnalyticalCardComponent } from '../analytical-card/analytical-card.component';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from '../table/table.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { format } from 'date-fns';
import { ChartComponent, IChartData } from '../chart/chart.component';
import { ExpensesServices } from '../expenses.service';
import { IncomesServices } from '../incomes.service';
@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [AnalyticalCardComponent, TableComponent, NgIf, NgFor, NgClass, ChartComponent],
  providers: [ExpensesServices, IncomesServices],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
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
      code: "type",
      name: "Tipo"
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
          code: "type",
          value: "Despesa"
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
      id: "13",
      values: [
        {
          code: "name",
          value: "Salario do mês"
        },
        {
          code: "type",
          value: "Receita"
        },
        {
          code: "ammount",
          value: 1800.00
        },
        {
          code: "date",
          sortableValue: new Date(2024, 1, 28).getTime(),
          value: format(new Date(2024, 1, 28), "dd/MM/yyyy")
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
          code: "type",
          value: "Despesa"
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
          code: "type",
          value: "Despesa"
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

  constructor(private expensesServices: ExpensesServices, private incomesServices: IncomesServices) {
    this.expensesServices.getExpenses().then((result) => {
      console.log(result);
    })
    this.incomesServices.getIncomes().then((result) => {
      console.log(result);
    })
  }
}
