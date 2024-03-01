import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'drawer',
  standalone: true,
  imports: [NgClass],
  providers: [BrowserAnimationsModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  animations: [
    trigger('OpenMenu', [
      state('open', style({
        left: '0px',
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class DrawerComponent {
  opened_menu = false;
  OpenMenu() {
    this.opened_menu = !this.opened_menu;
    console.log(`ALTEROU PARA: ${this.opened_menu}`)
  }
}
