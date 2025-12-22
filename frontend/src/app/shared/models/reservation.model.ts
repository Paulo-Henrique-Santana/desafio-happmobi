import { User } from './user.model';
import { Vehicle } from './vehicle.model';

export interface Reservation {
  id: string;
  userId: string;
  vehicleId: string;
  status: 'active' | 'cancelled' | 'completed';
  createdAt: string;
  user?: User;
  vehicle?: Vehicle;
}

export interface CreateReservationRequest {
  vehicleId: string;
}

export interface UpdateReservationRequest {
  status?: 'active' | 'cancelled' | 'completed';
}
