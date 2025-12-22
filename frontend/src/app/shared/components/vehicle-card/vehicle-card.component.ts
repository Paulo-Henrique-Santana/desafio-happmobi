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
  isReserved = input<boolean>(false);
  reservationId = input<string | null>(null);
  reserveVehicle = output<Vehicle>();
  cancelReservation = output<string>();

  onReserveClick() {
    this.reserveVehicle.emit(this.vehicle());
  }

  onCancelClick() {
    if (this.reservationId()) {
      this.cancelReservation.emit(this.reservationId()!);
    }
  }
}
