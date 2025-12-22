import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { CreateVehicleRequest, UpdateVehicleRequest } from '../../../../shared/models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
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
export class VehicleFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  vehicleId: string | null = null;
  isEditMode = false;
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

  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.vehicleId;

    if (this.isEditMode && this.vehicleId) {
      this.loadVehicle(this.vehicleId);
    }
  }

  loadVehicle(id: string) {
    this.isLoading = true;
    this.vehicleService
      .getOne(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (vehicle) => {
          this.vehicleForm.patchValue({
            name: vehicle.name,
            bodyType: vehicle.bodyType,
            engineType: vehicle.engineType,
            seats: vehicle.seats,
          });
          this.photoPreview = vehicle.photo;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao carregar veículo';
        },
      });
  }

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

    if (this.isEditMode && this.vehicleId) {
      const vehicleData: UpdateVehicleRequest = {
        name: this.vehicleForm.value.name,
        bodyType: this.vehicleForm.value.bodyType,
        engineType: this.vehicleForm.value.engineType,
        seats: Number(this.vehicleForm.value.seats),
        photo: this.selectedFile,
      };
      this.updateVehicle(this.vehicleId, vehicleData);
    } else {
      const vehicleData: CreateVehicleRequest = {
        name: this.vehicleForm.value.name,
        bodyType: this.vehicleForm.value.bodyType,
        engineType: this.vehicleForm.value.engineType,
        seats: Number(this.vehicleForm.value.seats),
        photo: this.selectedFile,
      };
      this.createVehicle(vehicleData);
    }
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

  updateVehicle(id: string, vehicleData: UpdateVehicleRequest) {
    this.vehicleService
      .update(id, vehicleData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/veiculos']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao atualizar veículo';
        },
      });
  }

  goBack() {
    this.router.navigate(['/veiculos']);
  }
}
