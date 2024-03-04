import { Component, OnInit, isDevMode  } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DrawerComponent, NgIf, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    if (isDevMode()) {
      // console.log('DEV MODE.:');
    } else {
      // console.log('PRODUCTION.:');
    }
  }
}
