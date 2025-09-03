import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarData } from 'lightweight-charts';
import { Observable } from 'rxjs';
import { BarApiResponse } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  constructor(private http: HttpClient) { }

  getHistoricalBars(
    instrumentId: string,
    provider: string = 'oanda',
    interval: number = 1,
    periodicity: string = 'minute',
    barsCount: number = 50
  ): Observable<BarApiResponse[]> {
    return this.http.get<BarApiResponse[]>(`/api/bars/v1/bars/count-back?instrumentId=${instrumentId}&provider=${provider}&interval=${interval}&periodicity=${periodicity}&barsCount=${barsCount}`);
  }
}
