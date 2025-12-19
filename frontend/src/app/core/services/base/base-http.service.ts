import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export abstract class BaseService {
  protected http = inject(HttpClient);
  protected abstract baseUrl: string;

  protected buildUrl(endpoint: string = ''): string {
    const base = `${environment.apiUrl}${this.baseUrl}`;
    return endpoint ? `${base}/${endpoint}` : base;
  }

  protected get<T>(
    endpoint: string = '',
    params?: Record<string, string | number | boolean>
  ): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), {
      params,
    });
  }

  protected post<T>(body: unknown, endpoint: string = ''): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body);
  }

  protected put<T>(body: unknown, endpoint: string = ''): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), body);
  }

  protected patch<T>(body: unknown, endpoint: string = ''): Observable<T> {
    return this.http.patch<T>(this.buildUrl(endpoint), body);
  }

  protected delete<T>(endpoint: string = ''): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint));
  }
}
