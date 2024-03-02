import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environment/environment.prod';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  if (environment.production) {
    enableProdMode();
  }
