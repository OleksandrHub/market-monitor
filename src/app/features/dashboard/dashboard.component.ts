import { Component, OnInit } from '@angular/core';
import { HistoricalChartComponent } from '../historical-chart/historical-chart.component';
import { LivePriceComponent } from '../live-price/live-price.component';
import { AuthService } from '../../core/services/auth.service';
import { RealtimeService } from '../../core/services/realtime.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HistoricalChartComponent, LivePriceComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  instruments: any[] = [];
  selectedInstrumentId: string | null = null;
  selectedInstrument: any = null;
  isSubscribed: boolean = false;

  constructor(private authService: AuthService, private realtimeService: RealtimeService) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe({
      next: (response) => {
        this.authService.setTokens(response.access_token, response.refresh_token);
        console.log('Token obtained:', this.authService.getAccessToken());
        this.realtimeService.connect();
        this.realtimeService.getInstruments().subscribe({
          next: (response: any) => {
            this.instruments = response.data || [];
            console.log('Instruments loaded:', this.instruments);
          },
          error: (err: any) => console.error('Error loading instruments:', err)
        });
      },
      error: (err: any) => console.error('Error obtaining token:', err)
    });
  }

  onInstrumentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedInstrumentId = target.value || null;
      this.selectedInstrument = this.instruments.find(
        (inst) => inst.id === this.selectedInstrumentId
      ) || null;
      if (this.isSubscribed) {
        // If already subscribed, unsubscribe and reset
        this.realtimeService.unsubscribeFromInstrument(this.selectedInstrumentId!);
        this.isSubscribed = false;
        this.realtimeService.subscribeToInstrument(this.selectedInstrumentId!);
        this.isSubscribed = true;
      }
    }
  }

  subscribe(): void {
    if (!this.selectedInstrumentId) return;

    if (this.isSubscribed) {
      this.realtimeService.unsubscribeFromInstrument(this.selectedInstrumentId);
      this.isSubscribed = false;
    } else {
      this.realtimeService.subscribeToInstrument(this.selectedInstrumentId);
      this.isSubscribed = true;
    }
  }
}
