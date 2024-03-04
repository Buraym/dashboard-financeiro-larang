import { NgClass } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, EventEmitter, Input, Output, HostListener, booleanAttribute, SimpleChange } from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [NgClass],
  providers: [BrowserAnimationsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  animations: [
    trigger('Close', [
      state('open_bg', style({
        opacity: 0.75,
        display: "block"
      })),
      state('open_content', style({
        opacity: 1,
        display: "block"
      })),
      state('closed', style({
        opacity: 0,
        display: "none"
      })),
      transition('open_bg => closed', [
        animate('250ms ease-in-out')
      ]),
      transition('closed => open_bg', [
        animate('250ms ease-in-out')
      ]),
      transition('open_content => closed', [
        animate('250ms ease-in-out')
      ]),
      transition('closed => open_content', [
        animate('250ms ease-in-out')
      ]),
    ]),
  ]
})
export class ModalComponent {
  @Input() title: string = "";
  @Input({transform: booleanAttribute }) active:boolean = false;
  @Output() active_parent = new EventEmitter<boolean>();

  Close() {
    this.active = false;
    this.active_parent.emit(false);
    console.log("FECHOU", this.active, this.active_parent)

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (String(event.key) === "Escape") {
      this.Close();
    }
  }

  ngOnChanges(changes: any) {
    console.log(changes.active.currentValue);
    this.active = changes.active.currentValue;
    this.active_parent.emit(changes.active.currentValue);
  }
}
