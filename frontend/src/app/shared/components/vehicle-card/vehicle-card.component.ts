import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';

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
