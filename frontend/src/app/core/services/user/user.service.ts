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
    const formData = new FormData();

    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    if (userData.photo) {
      formData.append('photo', userData.photo);
    }

    return this.post<User>(formData);
  }
}
