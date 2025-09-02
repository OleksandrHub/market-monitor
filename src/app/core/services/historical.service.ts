// src/app/core/services/historical.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getHistoricalBars(
    instrumentId: string,
    provider: string = 'oanda',
    interval: number = 1,
    periodicity: string = 'minute',
    startDate: string,
    endDate?: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getAccessToken()}`
    });

    let url = `/api/bars/v1/bars/date-range?instrumentId=${instrumentId}&provider=${provider}&interval=${interval}&periodicity=${periodicity}&startDate=${startDate}`;
    if (endDate) {
      url += `&endDate=${endDate}`;
    }

    console.log('Requesting historical bars:', url);
    return this.http.get(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching historical bars:', error);
        const mockData = this.getMockBars();
        console.log('Returning mock data:', mockData);
        return of({ data: mockData });
      })
    );
  }

  private getMockBars(): any[] {
    const now = new Date();
    return Array.from({ length: 10 }, (_, i) => {
      const timestamp = new Date(now.getTime() - i * 60000);
      return {
        timestamp: timestamp.toISOString(),
        close: 1.1020 + Math.random() * 0.01
      };
    }).reverse();
  }
}