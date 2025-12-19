import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, loginResponse } from '../../../shared/models/auth.model';
import { BaseService } from '../base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  protected baseUrl = '/auth';
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user_data';

  login(body: LoginRequest): Observable<loginResponse> {
    return this.post<loginResponse>(body, 'login').pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.accessToken);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
