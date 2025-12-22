import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';
import { FilterModalComponent, VehicleFilters } from '../../../../shared/components/filter-modal/filter-modal.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { VehicleCardComponent } from '../../../../shared/components/vehicle-card/vehicle-card.component';
import { User } from '../../../../shared/models/user.model';
import { Vehicle } from '../../../../shared/models/vehicle.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, VehicleCardComponent, NavigationComponent, FilterModalComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  private authService = inject(AuthService);
  private vehicleService = inject(VehicleService);
  private searchSubject = new Subject<string>();

  user: User = this.authService.getUser()!;
  isFilterModalOpen = false;
  activeFilters: VehicleFilters | null = null;
  searchQuery = '';
  isSearching = false;
  searchResults: Vehicle[] = [];

  lastReservations: Vehicle[] = [
    {
      id: '1',
      photo: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400',
      name: 'Mini Cooper - 2021',
      bodyType: 'Hatchback',
      engineType: '1.8',
      seats: 5,
    },
    {
      id: '2',
      photo: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      name: 'Jeep Compass - 2021',
      bodyType: 'SUV',
      engineType: '1.8',
      seats: 7,
    },
  ];

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
}
