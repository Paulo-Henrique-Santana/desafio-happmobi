import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

interface Vehicle {
  id: number;
  image: string;
  name: string;
  bodyType: string;
  engineType: string;
  seats: number;
}

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  vehicle = input.required<Vehicle>();
}
