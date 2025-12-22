import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [guestGuard],
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./features/auth/pages/register/register.page').then(
        (m) => m.RegisterPage
      ),
    canActivate: [guestGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./features/users/pages/edit-profile/edit-profile.page').then(
        (m) => m.EditProfilePage
      ),
    canActivate: [authGuard],
  },
  {
    path: 'veiculos',
    loadComponent: () =>
      import('./features/vehicles/pages/vehicles/vehicles.page').then(
        (m) => m.VehiclesPage
      ),
    canActivate: [authGuard],
  },
  {
    path: 'veiculos/novo',
    loadComponent: () =>
      import('./features/vehicles/pages/vehicle-form/create-vehicle.page').then(
        (m) => m.VehicleFormPage
      ),
    canActivate: [authGuard],
  },
  {
    path: 'veiculos/:id',
    loadComponent: () =>
      import('./features/vehicles/pages/vehicle-form/create-vehicle.page').then(
        (m) => m.VehicleFormPage
      ),
    canActivate: [authGuard],
  },
];
