import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { Vehicle } from '../../../../shared/models/vehicle.model';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
  ],
  templateUrl: './vehicles.page.html',
  styleUrl: './vehicles.page.scss',
})
export class VehiclesPage implements OnInit {
  private vehicleService = inject(VehicleService);
  private authService = inject(AuthService);
  private router = inject(Router);

  vehicles: Vehicle[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    const user = this.authService.getUser();
    if (!user?.isAdmin) {
      this.router.navigate(['/home']);
      return;
    }
    
    this.loadVehicles();
  }

  loadVehicles() {
    this.isLoading = true;
    this.vehicleService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao carregar veículos';
        },
      });
  }

  deleteVehicle(id: string) {
    const confirmed = confirm('Tem certeza que deseja remover este veículo?');
    
    if (!confirmed) return;

    this.isLoading = true;
    this.vehicleService
      .deleteVehicle(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao remover veículo';
        },
      });
  }

  goToCreateVehicle() {
    this.router.navigate(['/veiculos/novo']);
  }

  editVehicle(id: string) {
    this.router.navigate(['/veiculos', id]);
  }
}
