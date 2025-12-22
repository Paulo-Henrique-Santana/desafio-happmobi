import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  bodyTypeOptions = [
    { value: 'Hatch compacto', label: 'Hatch compacto' },
    { value: 'Hatch médio', label: 'Hatch médio' },
    { value: 'SUV compacto', label: 'SUV compacto' },
    { value: 'SUV médio', label: 'SUV médio' },
    { value: 'SUV grande', label: 'SUV grande' },
    { value: 'Crossover', label: 'Crossover' },
    { value: 'Coupé', label: 'Coupé' },
    { value: 'Picape leve', label: 'Picape leve' },
    { value: 'Picape leve-média', label: 'Picape leve-média' },
    { value: 'Picape média', label: 'Picape média' },
    { value: 'Sedan Compacto', label: 'Sedan Compacto' },
    { value: 'Sedan Médio', label: 'Sedan Médio' },
    { value: 'Sedan Grande', label: 'Sedan Grande' },
    { value: 'Minivan/monovolume', label: 'Minivan/monovolume' },
    { value: 'Utilitário leve', label: 'Utilitário leve' },
    { value: 'Utilitário', label: 'Utilitário' },
  ];

  engineTypeOptions = [
    { value: '1.0', label: 'Motor 1.0' },
    { value: '1.4', label: 'Motor 1.4' },
    { value: '1.6', label: 'Motor 1.6' },
    { value: '1.8', label: 'Motor 1.8' },
    { value: '2.0', label: 'Motor 2.0' },
  ];

  seatsOptions = [2, 3, 4, 5, 6, 7];

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
