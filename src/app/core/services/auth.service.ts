import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TokenResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(): Observable<string> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'app-cli');
    body.set('username', environment.username);
    body.set('password', environment.password);

    return this.http.post<TokenResponse>('/api/identity/realms/fintatech/protocol/openid-connect/token', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(map(response => {
      this.token = response.access_token;
      return this.token;
    }));
  }

  getToken(): string | null {
    return this.token;
  }
}