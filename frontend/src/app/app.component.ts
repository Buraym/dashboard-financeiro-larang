import { Component } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ITableFooter, ITableHeader, ITableRows } from './table/table.component';
import { DrawerComponent } from './drawer/drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawerComponent, NgIf, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
