import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
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
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./features/vehicles/vehicle.routes').then((m) => m.vehicleRoutes),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
