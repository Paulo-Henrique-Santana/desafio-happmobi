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
    return this.searchQuery ? this.searchResults : this.lastReservations;
  }

  get showLastReservations() {
    return !this.searchQuery;
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
        if (query) {
          this.searchVehicles(query);
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
    
    this.vehicleService
      .getAll()
      .pipe(finalize(() => (this.isSearching = false)))
      .subscribe({
        next: (vehicles) => {
          this.searchResults = vehicles.filter(vehicle => {
            const normalizedName = vehicle.name.toLowerCase().replace(/\s+/g, ' ').trim();
            return normalizedName.includes(normalizedQuery);
          });
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
  }
}
