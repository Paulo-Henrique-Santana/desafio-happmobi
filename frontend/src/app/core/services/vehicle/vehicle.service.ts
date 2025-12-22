import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleFilters } from '../../../shared/components/filter-modal/filter-modal.component';
import { CreateVehicleRequest, UpdateVehicleRequest, Vehicle } from '../../../shared/models/vehicle.model';
import { BaseService } from '../base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService {
  protected baseUrl = '/vehicles';

  getAll(filters?: { name?: string } & VehicleFilters): Observable<Vehicle[]> {
    const params: Record<string, string> = {};

    if (filters?.name) {
      params['name'] = filters.name;
    }

    if (filters?.bodyTypes && filters.bodyTypes.length > 0) {
      params['bodyTypes'] = filters.bodyTypes.join(',');
    }

    if (filters?.engineTypes && filters.engineTypes.length > 0) {
      params['engineTypes'] = filters.engineTypes.join(',');
    }

    if (filters?.seats && filters.seats.length > 0) {
      params['seats'] = filters.seats.join(',');
    }

    return this.get<Vehicle[]>('', params);
  }

  getOne(id: string): Observable<Vehicle> {
    return this.get<Vehicle>(id);
  }

  create(vehicleData: CreateVehicleRequest): Observable<Vehicle> {
    const formData = new FormData();

    formData.append('name', vehicleData.name);
    formData.append('bodyType', vehicleData.bodyType);
    formData.append('engineType', vehicleData.engineType);
    formData.append('seats', vehicleData.seats.toString());

    if (vehicleData.photo) {
      formData.append('photo', vehicleData.photo);
    }

    return this.post<Vehicle>(formData);
  }

  update(id: string, vehicleData: UpdateVehicleRequest): Observable<Vehicle> {
    const formData = new FormData();

    Object.entries(vehicleData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    return this.patch<Vehicle>(formData, id);
  }

  deleteVehicle(id: string): Observable<{ message: string }> {
    return this.delete<{ message: string }>(id);
  }
}
