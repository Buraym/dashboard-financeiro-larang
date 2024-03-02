import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'analytical-card',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './analytical-card.component.html',
  styleUrl: './analytical-card.component.css'
})
export class AnalyticalCardComponent {
  @Input() main_title!: string;
  @Input() value!: string;
  @Input() subtitle!: string;
  @Input() subtitle_operation!: "down" | "up" | "tip";
  @Input() category!: string;
}
