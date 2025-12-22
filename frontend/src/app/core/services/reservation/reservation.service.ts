import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReservationRequest, Reservation, UpdateReservationRequest } from '../../../shared/models/reservation.model';
import { BaseService } from '../base/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService extends BaseService {
  protected baseUrl = '/reservations';

  create(data: CreateReservationRequest): Observable<Reservation> {
    return this.post<Reservation>(data);
  }

  getAll(): Observable<Reservation[]> {
    return this.get<Reservation[]>();
  }

  getById(id: string): Observable<Reservation> {
    return this.get<Reservation>(id);
  }

  getActiveReservation(): Observable<Reservation | null> {
    return this.get<Reservation | null>('active');
  }

  update(id: string, data: UpdateReservationRequest): Observable<Reservation> {
    return this.patch<Reservation>(data, id);
  }

  cancel(id: string): Observable<Reservation> {
    return this.patch<Reservation>({}, `${id}/cancel`);
  }
}
