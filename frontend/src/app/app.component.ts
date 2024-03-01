import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticalCardComponent } from './analytical-card/analytical-card.component';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from './table/table.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnalyticalCardComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  headers:Array<ITableHeader> = [
    {
      code: "id",
      name: "ID",
      sortable: "number"
    },
    {
      code: "name",
      name: "Nome da transação",
      sortable: "string"
    },
    {
      code: "type",
      name: "Tipo",
      sortable: "string"
    },
    {
      code: "ammount",
      name: "Valor",
      sortable: "number"
    },
  ]
  rows:Array<ITableRows> = [
    {
      id: "17",
      code: "id",
      name: "ID",
      values: [
        {
          code: "id",
          value: "17"
        },
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
      ]
    },
    {
      id: "13",
      code: "name",
      name: "Nome da transação",
      values: [
        {
          code: "id",
          value: "17"
        },
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
      ]
    },
    {
      id: "13",
      code: "name",
      name: "Nome da transação",
      values: [
        {
          code: "id",
          value: "17"
        },
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
      ]
    },
    {
      id: "11",
      code: "name",
      name: "Nome da transação",
      values: [
        {
          code: "id",
          value: "17"
        },
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
      ]
    }
  ]
  footer_rows:Array<ITableFooter> = [
    {
      code: "tip",
      name: "Dica .: Sempre tente reservar um dinheiro para investir e/ou em reserva de capital rápido."
    },
  ]
}
