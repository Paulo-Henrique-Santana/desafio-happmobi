import { Routes } from '@angular/router';

export const vehicleRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/vehicles/vehicles.page').then((m) => m.VehiclesPage),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./pages/vehicle-form/create-vehicle.page').then(
        (m) => m.VehicleFormPage
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/vehicle-form/create-vehicle.page').then(
        (m) => m.VehicleFormPage
      ),
  },
];
