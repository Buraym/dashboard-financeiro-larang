import { Component } from '@angular/core';
import { AnalyticalCardComponent } from '../analytical-card/analytical-card.component';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from '../table/table.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { format, getDaysInMonth  } from 'date-fns';
import { ChartComponent } from '../donut-chart/chart.component';
import { AnalyticsServices } from '../analytics.service';
import { BarChartComponent, IChartDataSets } from '../bar-chart/bar-chart.component';
@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [AnalyticalCardComponent, TableComponent, NgIf, NgFor, NgClass, ChartComponent, BarChartComponent],
  providers: [AnalyticsServices],
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
  chartData: Array<IChartDataSets> = [];
  chartLabels: Array<string> = [];

  analytical_expense_total: string = "";
  analytical_expense_tip: string = "";
  analytical_income_total: string = "";
  analytical_income_tip: string = "";
  analytical_last_register_data: string = "";
  analytical_last_register_name: string = "";
  analytical_percentage_data: string = "";

  constructor(private analyticsServices: AnalyticsServices) {
    this.analyticsServices.getStatsMonth().then((result) => {
      console.log(result);
      const BRLFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      this.analytical_expense_total = BRLFormatter.format(result.expenses_total);
      this.analytical_income_total = BRLFormatter.format(result.incomes_total);
      let last_register = null;
      if (Math.round(Math.random())) {
        last_register = result.last_expense[0];
      } else {
        last_register = result.last_income[0];
      }

      this.analytical_last_register_data = BRLFormatter.format(last_register.ammount)
      this.analytical_last_register_name = last_register.name;
      this.analytical_percentage_data = `${result.percentage_acquired}% da receita`;



      this.rows = [...result.expenses, ...result.incomes]
        .sort((a: any, b: any) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
        .map((row) => {
          return {
            id: row.id,
            values: [
              {
                code: "name",
                value: row.name
              },
              {
                code: "type",
                value: row.due_date ? "Despesa" : "Receita"
              },
              {
                code: "ammount",
                value: Number(row.ammount)
              },
              {
                code: "date",
                sortableValue : new Date(row.date).getTime(),
                value: format(new Date(row.date), "dd/MM/yyyy")
              },
            ]
          }
        });

      this.chartLabels = Array.from({length: getDaysInMonth(new Date())}).map((_, index) => `Dia ${index + 1}º`);

      this.chartData = [
        {
          label: "Receitas",
          backgroundColor: result.incomes.map((_: any) => "#136f63"),
          data: Array.from({length: getDaysInMonth(new Date())}).map((_, index) => {
            let income = result.incomes.find((income: any) => new Date(income.date).getDate() === index + 1)
            if (income) {
              return income.ammount;
            }
            return 0;
          }),
          hoverOffset: 4
        },
        {
          label: "Despesas",
          backgroundColor: result.expenses.map((_: any) => "#f95738"),
          data: Array.from({length: getDaysInMonth(new Date())}).map((_, index) => {
            let expense = result.expenses.find((expense: any) => new Date(expense.date).getDate() === index + 1)
            if (expense) {
              return expense.ammount;
            }
            return 0;
          }),
          hoverOffset: 4
        }
      ];
      console.log(this.chartData);
    });
  }
}
