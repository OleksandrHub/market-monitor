import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private wsSubject: WebSocketSubject<any> | null = null;
  private priceSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private authService: AuthService) { }

  getInstruments(provider: string = 'oanda', kind: string = 'forex'): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`
    });
    return this.http.get(`/api/instruments/v1/instruments?provider=${provider}&kind=${kind}`, { headers });
  }

  connect(): void {
    if (this.wsSubject) {
      return;
    }
    const token = this.authService.getAccessToken();
    const wsUrl = `${environment.wssUrl}/api/ws/v1/realtime?access_token=${token}`;
    this.wsSubject = webSocket(wsUrl);

    this.wsSubject.subscribe({
      next: (msg: any) => {
        console.log('Received message:', msg);
        this.priceSubject.next(msg);
      },
      error: (err: any) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed')
    });
  }

  subscribeToInstrument(instrumentId: string): void {
    if (this.wsSubject) {
      this.wsSubject.next({
        action: 'subscribe',
        type: 'price',
        instrumentId: instrumentId
      });
    } else {
      console.error('WebSocket not connected');
    }
  }

  unsubscribeFromInstrument(instrumentId: string): void {
    if (this.wsSubject) {
      this.wsSubject.next({
        action: 'unsubscribe',
        type: 'price',
        instrumentId: instrumentId
      });
    }
  }

  getPriceUpdates(): Observable<any> {
    return this.priceSubject.asObservable();
  }

  disconnect(): void {
    if (this.wsSubject) {
      this.wsSubject.complete();
      this.wsSubject = null;
    }
  }
}