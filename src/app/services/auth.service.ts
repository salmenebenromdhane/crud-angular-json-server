import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user) {
    return this.http.post(environment.base_url + 'users', user);
  }

  login(email, password) {
    return this.http.get(
      environment.base_url + 'users?email=' + email + '&password=' + password
    );
  }
}
