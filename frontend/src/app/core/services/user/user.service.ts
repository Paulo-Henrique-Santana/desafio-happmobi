import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest, User } from '../../../shared/models/user.model';
import { BaseService } from '../base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  protected baseUrl = '/users';

  create(userData: CreateUserRequest): Observable<User> {
    return this.post<User>(userData);
  }
}
