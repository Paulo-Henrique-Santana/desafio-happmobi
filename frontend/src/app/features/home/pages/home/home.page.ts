import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { FilterModalComponent, VehicleFilters } from '../../../../shared/components/filter-modal/filter-modal.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { VehicleCardComponent } from '../../../../shared/components/vehicle-card/vehicle-card.component';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, NavigationComponent, FilterModalComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private authService = inject(AuthService);

  user: User = this.authService.getUser()!;
  isFilterModalOpen = false;
  activeFilters: VehicleFilters | null = null;

  vehicles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400',
      name: 'Mini Cooper - 2021',
      bodyType: 'Hatchback',
      engineType: '1.8',
      seats: 5,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      name: 'Jeep Compass - 2021',
      bodyType: 'SUV',
      engineType: '1.8',
      seats: 7,
    },
  ];

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
