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
        opacity: 1,
        left: 0,
        position: "fixed",
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('250ms ease-in-out')
      ]),
      transition('closed => open', [
        animate('250ms ease-in-out')
      ]),
    ]),
  ]
})
export class DrawerComponent {
  opened_menu = false;
  OpenMenu() {
    this.opened_menu = !this.opened_menu;
  }
}
