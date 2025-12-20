import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login/login.page';
import { RegisterPage } from './features/auth/pages/register/register.page';
import { HomePage } from './features/home/pages/home/home.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => LoginPage
  },
  {
    path: 'cadastro',
    loadComponent: () => RegisterPage
  },
  {
    path: 'home',
    loadComponent: () => HomePage
  }
];
