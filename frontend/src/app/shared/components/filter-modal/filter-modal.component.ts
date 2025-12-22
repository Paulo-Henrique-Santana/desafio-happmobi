import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VEHICLE_BODY_TYPES, VEHICLE_ENGINE_TYPES, VEHICLE_SEATS_OPTIONS } from '../../constants/vehicle-options';

export interface VehicleFilters {
  bodyTypes: string[];
  engineTypes: string[];
  seats: number[];
}

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss',
})
export class FilterModalComponent {
  isOpen = input<boolean>(false);
  closeModal = output<void>();
  applyFilters = output<VehicleFilters>();

  selectedBodyTypes: string[] = [];
  selectedEngineTypes: string[] = [];
  selectedSeats: number[] = [];

  isBodyTypesExpanded = true;
  isEngineTypesExpanded = true;
  isSeatsExpanded = true;

  bodyTypeOptions = VEHICLE_BODY_TYPES;
  engineTypeOptions = VEHICLE_ENGINE_TYPES;
  seatsOptions = VEHICLE_SEATS_OPTIONS;

  toggleBodyType(value: string) {
    const index = this.selectedBodyTypes.indexOf(value);
    if (index > -1) {
      this.selectedBodyTypes.splice(index, 1);
    } else {
      this.selectedBodyTypes.push(value);
    }
  }

  toggleEngineType(value: string) {
    const index = this.selectedEngineTypes.indexOf(value);
    if (index > -1) {
      this.selectedEngineTypes.splice(index, 1);
    } else {
      this.selectedEngineTypes.push(value);
    }
  }

  toggleSeats(value: number) {
    const index = this.selectedSeats.indexOf(value);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(value);
    }
  }

  isBodyTypeSelected(value: string): boolean {
    return this.selectedBodyTypes.includes(value);
  }

  isEngineTypeSelected(value: string): boolean {
    return this.selectedEngineTypes.includes(value);
  }

  isSeatsSelected(value: number): boolean {
    return this.selectedSeats.includes(value);
  }

  toggleBodyTypesSection() {
    this.isBodyTypesExpanded = !this.isBodyTypesExpanded;
  }

  toggleEngineTypesSection() {
    this.isEngineTypesExpanded = !this.isEngineTypesExpanded;
  }

  toggleSeatsSection() {
    this.isSeatsExpanded = !this.isSeatsExpanded;
  }

  onApplyFilters() {
    this.applyFilters.emit({
      bodyTypes: this.selectedBodyTypes,
      engineTypes: this.selectedEngineTypes,
      seats: this.selectedSeats,
    });
    this.close();
  }

  onClearFilters() {
    this.selectedBodyTypes = [];
    this.selectedEngineTypes = [];
    this.selectedSeats = [];
  }

  close() {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('filter-modal-overlay')) {
      this.close();
    }
  }
}
