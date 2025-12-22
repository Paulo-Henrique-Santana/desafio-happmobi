import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../core/services/reservation/reservation.service';
import { Vehicle } from '../../models/vehicle.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './reservation-modal.component.html',
  styleUrl: './reservation-modal.component.scss',
})
export class ReservationModalComponent {
  private reservationService = inject(ReservationService);

  isOpen = input<boolean>(false);
  vehicle = input<Vehicle | null>(null);
  closeModal = output<void>();
  reservationSuccess = output<void>();

  isSubmitting = false;
  errorMessage = '';

  constructor() {
    effect(() => {
      if (!this.isOpen()) {
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.errorMessage = '';
    this.isSubmitting = false;
  }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.errorMessage = '';

    if (!this.vehicle()) {
      this.errorMessage = 'Veículo não selecionado';
      return;
    }

    this.isSubmitting = true;

    const reservationData = {
      vehicleId: this.vehicle()!.id,
    };

    this.reservationService.create(reservationData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.reservationSuccess.emit();
        this.onClose();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Erro ao criar reserva. Tente novamente.';
      },
    });
  }
}
