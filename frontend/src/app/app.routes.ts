import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DespesasPageComponent } from './despesas-page/despesas-page.component';
import { ReceitasPageComponent } from './receitas-page/receitas-page.component';

export const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: 'despesas', component: DespesasPageComponent },
  { path: 'receitas', component: ReceitasPageComponent },
  { path: '**', component: NotFoundPageComponent, title: "Página não encontrada !" },
];
