import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest, UpdateUserRequest, User } from '../../../shared/models/user.model';
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

  update(id: string, userData: UpdateUserRequest): Observable<User> {
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    return this.patch<User>(formData, id);
  }

  deleteUser(id: string): Observable<{ message: string }> {
    return this.delete<{ message: string }>(id);
  }
}
