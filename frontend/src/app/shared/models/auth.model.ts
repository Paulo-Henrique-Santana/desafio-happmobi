export interface LoginRequest {
  email: string;
  password: string;
}

export interface loginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
