import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, Observable, switchMap, tap } from 'rxjs';
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
  private router = inject(Router);
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  vehicles$!: Observable<Vehicle[]>;
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.setupVehicles();
  }

  setupVehicles() {
    this.vehicles$ = this.refreshTrigger$.pipe(
      tap(() => {
        this.isLoading = true;
        this.errorMessage = '';
      }),
      switchMap(() => this.vehicleService.getAll().pipe(
        finalize(() => this.isLoading = false),
        tap({
          error: (error) => {
            this.errorMessage = error.error?.message || 'Erro ao carregar veículos';
          }
        })
      ))
    );
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
          this.refreshTrigger$.next();
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
