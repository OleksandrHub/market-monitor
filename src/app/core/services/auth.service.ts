import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient) { }

  public login(): Observable<AuthResponse> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'app-cli')
      .set('username', environment.username)
      .set('password', environment.password);

    return this.http.post<AuthResponse>(`/api/identity/realms/fintatech/protocol/openid-connect/token`, body)
      .pipe(
        tap((res: AuthResponse) => {
          this.accessToken = res.access_token;
          this.refreshToken = res.refresh_token;
        })
      );
  }

  public getToken(): string | null {
    return this.accessToken;
  }

  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }

  public isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}