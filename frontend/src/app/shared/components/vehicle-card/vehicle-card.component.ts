import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  vehicle = input.required<Vehicle>();
  reserveVehicle = output<Vehicle>();

  onReserveClick() {
    this.reserveVehicle.emit(this.vehicle());
  }
}
