export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  photo?: File | null;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  photo?: File | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  isAdmin: boolean;
}
