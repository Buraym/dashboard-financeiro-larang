import { Component } from '@angular/core';
import { format } from 'date-fns';
import { ITableFooter, ITableHeader, ITableRows, TableComponent } from '../table/table.component';

@Component({
  selector: 'app-despesas-page',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './despesas-page.component.html',
  styleUrl: './despesas-page.component.css'
})
export class DespesasPageComponent {
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
}
