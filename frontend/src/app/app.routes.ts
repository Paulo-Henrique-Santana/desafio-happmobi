import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login/login.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => LoginPage
  }
];
