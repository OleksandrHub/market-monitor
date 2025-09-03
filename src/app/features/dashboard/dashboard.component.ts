import { Component, OnInit } from '@angular/core';
import { HistoricalChartComponent } from '../historical-chart/historical-chart.component';
import { LivePriceComponent } from '../live-price/live-price.component';
import { AuthService } from '../../core/services/auth.service';
import { RealtimeService } from '../../core/services/realtime.service';
import { Instrument, InstrumentsResponse, SelectInstrument } from '../../core/models/price.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HistoricalChartComponent, LivePriceComponent, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  livePriceActive = false;
  selectedInstrumentId?: string;
  selectedInstrument?: SelectInstrument;
  protected instruments: Instrument[] = [];

  constructor(private authService: AuthService, private realtimeService: RealtimeService) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe({
      next: (response) => {
        this.authService.setTokens(response.access_token, response.refresh_token);
        console.log('Token obtained:', this.authService.getAccessToken());

        this.realtimeService.getInstruments().subscribe({
          next: (response: InstrumentsResponse) => {
            this.instruments = response.data;
            console.log('Instruments:', this.instruments);
          },
          error: (err) => {
            console.error('Error obtaining instruments:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error obtaining token:', err);
      }
    });
  }

  toggleLivePrice() {
    this.livePriceActive = !this.livePriceActive;

    if (this.livePriceActive) {
      this.selectedInstrument = this.instruments.find(instrument => instrument.id === this.selectedInstrumentId);
    } else {
      this.selectedInstrument = undefined;
    }
  }
}
