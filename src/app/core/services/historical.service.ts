import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarData } from '../models/asset.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  public getHistoricalBars(
    instrumentId: string,
    provider: string = 'oanda',
    interval: number = 1,
    periodicity: string = 'minute',
    barsCount: number = 50
  ): Observable<{ data: BarData[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`,
    });
    return this.http.get<{ data: BarData[] }>(`/api/bars/v1/bars/count-back?instrumentId=${instrumentId}&provider=${provider}&interval=${interval}&periodicity=${periodicity}&barsCount=${barsCount}`, { headers });
  }
}
