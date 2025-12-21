import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { VehicleCardComponent } from '../../../../shared/components/vehicle-card/vehicle-card.component';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, NavigationComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private authService = inject(AuthService);

  user: User = this.authService.getUser()!;

  vehicles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400',
      name: 'Mini Cooper - 2021',
      bodyType: 'Hatch compacto',
      engineType: 'Motor 1.8',
      seats: 5,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
      name: 'Jeep Compass - 2021',
      bodyType: 'SUV Médio',
      engineType: 'Motor 1.8',
      seats: 7,
    },
  ];
}
