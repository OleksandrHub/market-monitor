import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Instrument {
    id: string;
    symbol: string;
}

@Injectable({
    providedIn: 'root'
})
export class InstrumentService {
    private apiUrl = 'http://127.0.0.1:8080/api/instruments';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getInstruments(): Observable<Instrument[]> {
        const token = this.authService.getToken();
        if (!token) {
            console.error('No authentication token available, returning fallback instruments');
            return of([{ id: 'c0ea1432-2b7a-40c8-a015-074dbb94d7b6', symbol: 'EUR/USD' }]);
        }

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<{ data: Instrument[] }>(this.apiUrl, { headers }).pipe(
            map(response => {
                console.log('Instruments response:', response);
                return response.data || [{ id: 'c0ea1432-2b7a-40c8-a015-074dbb94d7b6', symbol: 'EUR/USD' }];
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Instruments request failed:', {
                    status: error.status,
                    statusText: error.statusText,
                    url: error.url,
                    error: error.error
                });
                return of([{ id: 'c0ea1432-2b7a-40c8-a015-074dbb94d7b6', symbol: 'EUR/USD' }]);
            })
        );
    }
}