import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { CreateVehicleRequest } from '../../../../shared/models/vehicle.model';

@Component({
  selector: 'app-create-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    ErrorMessageComponent,
    NavigationComponent,
  ],
  templateUrl: './create-vehicle.page.html',
  styleUrl: './create-vehicle.page.scss',
})
export class CreateVehiclePage {
  private fb = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  photoPreview: string | null = null;

  vehicleForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    bodyType: ['', [Validators.required]],
    engineType: ['', [Validators.required]],
    seats: ['', [Validators.required, Validators.min(1)]],
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.vehicleForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const vehicleData: CreateVehicleRequest = {
      name: this.vehicleForm.value.name,
      bodyType: this.vehicleForm.value.bodyType,
      engineType: this.vehicleForm.value.engineType,
      seats: Number(this.vehicleForm.value.seats),
      photo: this.selectedFile,
    };

    this.createVehicle(vehicleData);
  }

  createVehicle(vehicleData: CreateVehicleRequest) {
    this.vehicleService
      .create(vehicleData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/veiculos']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message;
        },
      });
  }

  goBack() {
    this.router.navigate(['/veiculos']);
  }
}
