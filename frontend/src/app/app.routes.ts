import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginPage } from './features/auth/pages/login/login.page';
import { RegisterPage } from './features/auth/pages/register/register.page';
import { HomePage } from './features/home/pages/home/home.page';
import { EditProfilePage } from './features/users/pages/edit-profile/edit-profile.page';
import { VehicleFormPage } from './features/vehicles/pages/vehicle-form/create-vehicle.page';
import { VehiclesPage } from './features/vehicles/pages/vehicles/vehicles.page';

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
    loadComponent: () => HomePage,
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => EditProfilePage,
    canActivate: [authGuard]
  },
  {
    path: 'veiculos',
    loadComponent: () => VehiclesPage,
    canActivate: [authGuard]
  },
  {
    path: 'veiculos/novo',
    loadComponent: () => VehicleFormPage,
    canActivate: [authGuard]
  },
  {
    path: 'veiculos/:id',
    loadComponent: () => VehicleFormPage,
    canActivate: [authGuard]
  }
];
