export interface Vehicle {
  id: string;
  name: string;
  photo: string | null;
  bodyType: string;
  engineType: string;
  seats: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleRequest {
  name: string;
  bodyType: string;
  engineType: string;
  seats: number;
  photo?: File | null;
}

export interface UpdateVehicleRequest {
  name?: string;
  bodyType?: string;
  engineType?: string;
  seats?: number;
  photo?: File | null;
}
