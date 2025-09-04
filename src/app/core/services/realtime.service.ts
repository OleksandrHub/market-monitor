import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InstrumentsResponse, LivePrice } from '../models/price.model';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private socket!: WebSocket;
  private priceSubject = new Subject<LivePrice>();

  constructor(private http: HttpClient, private authService: AuthService, private ngZone: NgZone) { }

  public getInstruments(provider: string = 'oanda', kind: string = 'forex'): Observable<InstrumentsResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.get<InstrumentsResponse>(`/api/instruments/v1/instruments?provider=${provider}&kind=${kind}`, { headers });
  }

  public connect(token: string, instrumentId: string): Observable<LivePrice> {
    const url = `${environment.wssUrl}/api/streaming/ws/v1/realtime?token=${token}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({
        type: 'l1-subscription',
        id: '1',
        instrumentId,
        provider: 'oanda',
        subscribe: true,
        kinds: ['ask', 'bid', 'last']
      }));
    };

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'l1-update' || msg.type === 'l1-snapshot') {
        this.ngZone.run(() => {
          console.log('Received message:', msg);
          this.priceSubject.next({
            instrumentId: msg.instrumentId,
            bid: msg.bid?.price,
            ask: msg.ask?.price,
            last: msg.last?.price
          });
        });
      }
    };

    return this.priceSubject.asObservable();
  }

  public disconnect() {
    this.socket?.close();
  }
}
