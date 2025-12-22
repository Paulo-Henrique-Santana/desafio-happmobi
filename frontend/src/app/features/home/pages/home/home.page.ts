import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ReservationService } from '../../../../core/services/reservation/reservation.service';
import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';
import { FilterModalComponent, VehicleFilters } from '../../../../shared/components/filter-modal/filter-modal.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { ReservationModalComponent } from '../../../../shared/components/reservation-modal/reservation-modal.component';
import { VehicleCardComponent } from '../../../../shared/components/vehicle-card/vehicle-card.component';
import { User } from '../../../../shared/models/user.model';
import { Vehicle } from '../../../../shared/models/vehicle.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, VehicleCardComponent, NavigationComponent, FilterModalComponent, ReservationModalComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  private authService = inject(AuthService);
  private vehicleService = inject(VehicleService);
  private reservationService = inject(ReservationService);
  private searchSubject = new Subject<string>();

  user: User = this.authService.getUser()!;
  isFilterModalOpen = false;
  isReservationModalOpen = false;
  selectedVehicle: Vehicle | null = null;
  activeFilters: VehicleFilters | null = null;
  searchQuery = '';
  isSearching = false;
  searchResults: Vehicle[] = [];
  lastReservations: Vehicle[] = [];
  userReservations: Map<string, string> = new Map();

  get vehicles() {
    return this.searchQuery || this.hasActiveFilters ? this.searchResults : this.lastReservations;
  }

  get showLastReservations() {
    return !this.searchQuery && !this.hasActiveFilters;
  }

  get hasActiveFilters() {
    return this.activeFilters && (
      this.activeFilters.bodyTypes.length > 0 ||
      this.activeFilters.engineTypes.length > 0 ||
      this.activeFilters.seats.length > 0
    );
  }

  ngOnInit() {
    this.setupSearchSubscription();
    this.loadUserReservations();
  }

  loadUserReservations() {
    this.reservationService.getAll().subscribe({
      next: (reservations) => {
        this.userReservations.clear();
        
        reservations.forEach(r => {
          if (r.vehicle && r.status === 'active') {
            this.userReservations.set(r.vehicle.id, r.id);
          }
        });

        this.lastReservations = reservations
          .filter(r => r.vehicle)
          .map(r => r.vehicle!);
      },
      error: (error) => {
        console.error('Erro ao buscar reservas:', error);
        this.lastReservations = [];
      },
    });
  }

  setupSearchSubscription() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
          this.searchVehicles(trimmedQuery);
        } else {
          this.searchResults = [];
        }
      });
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  searchVehicles(query: string) {
    this.isSearching = true;
    const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
    
    const filters: any = { name: normalizedQuery };
    
    if (this.hasActiveFilters && this.activeFilters) {
      filters.bodyTypes = this.activeFilters.bodyTypes;
      filters.engineTypes = this.activeFilters.engineTypes;
      filters.seats = this.activeFilters.seats;
    }
    
    this.vehicleService
      .getAll(filters)
      .pipe(finalize(() => (this.isSearching = false)))
      .subscribe({
        next: (vehicles) => {
          this.searchResults = vehicles;
        },
        error: (error) => {
          console.error('Erro ao buscar veículos:', error);
          this.searchResults = [];
        },
      });
  }

  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  applyFilters(filters: VehicleFilters) {
    this.activeFilters = filters;
    this.isSearching = true;
    
    const apiFilters: any = {
      bodyTypes: filters.bodyTypes,
      engineTypes: filters.engineTypes,
      seats: filters.seats,
    };

    if (this.searchQuery.trim()) {
      apiFilters.name = this.searchQuery.trim();
    }
    
    this.vehicleService
      .getAll(apiFilters)
      .pipe(finalize(() => (this.isSearching = false)))
      .subscribe({
        next: (vehicles) => {
          this.searchResults = vehicles;
        },
        error: (error) => {
          console.error('Erro ao buscar veículos:', error);
          this.searchResults = [];
        },
      });
  }

  openReservationModal(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.isReservationModalOpen = true;
  }

  closeReservationModal() {
    this.isReservationModalOpen = false;
    this.selectedVehicle = null;
  }

  onReservationSuccess() {
    this.loadUserReservations();
    if (this.searchQuery || this.hasActiveFilters) {
      this.applyFilters(this.activeFilters || { bodyTypes: [], engineTypes: [], seats: [] });
    }
  }

  isVehicleReserved(vehicleId: string): boolean {
    return this.userReservations.has(vehicleId);
  }

  getReservationId(vehicleId: string): string | null {
    return this.userReservations.get(vehicleId) || null;
  }

  onCancelReservation(reservationId: string) {
    if (confirm('Deseja realmente liberar este veículo?')) {
      this.reservationService.cancel(reservationId).subscribe({
        next: () => {
          this.loadUserReservations();
        },
      });
    }
  }
}
