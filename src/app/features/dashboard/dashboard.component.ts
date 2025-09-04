import { Component, OnInit } from '@angular/core';
import { HistoricalChartComponent } from '../historical-chart/historical-chart.component';
import { LivePriceComponent } from '../live-price/live-price.component';
import { AuthService } from '../../core/services/auth.service';
import { RealtimeService } from '../../core/services/realtime.service';
import { Instrument, InstrumentsResponse, SelectInstrument } from '../../core/models/price.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarData } from '../../core/models/asset.model';
import { HistoricalService } from '../../core/services/historical.service';

@Component({
  selector: 'app-dashboard',
  imports: [HistoricalChartComponent, LivePriceComponent, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public livePriceActive = false;
  public showChart = false;

  public selectedInstrumentId?: string;
  public selectedInstrument?: SelectInstrument;

  protected bars: BarData[] = [];
  protected instruments: Instrument[] = [];

  constructor(private authService: AuthService, private realtimeService: RealtimeService, private historicalService: HistoricalService) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe({
      next: (response) => {
        this.authService.setTokens(response.access_token, response.refresh_token);
        // console.log('Token obtained:', this.authService.getAccessToken());

        this.realtimeService.getInstruments().subscribe({
          next: (response: InstrumentsResponse) => {
            this.instruments = response.data;
            this.selectedInstrumentId = this.instruments[0].id;
            // console.log('Instruments obtained:', this.instruments);
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

  public toggleLivePrice() {
    this.livePriceActive = !this.livePriceActive;

    if (this.livePriceActive) {
      this.selectedInstrument = this.instruments.find(instrument => instrument.id === this.selectedInstrumentId);
      if (this.selectedInstrumentId && !this.showChart) {
        this.historicalService.getHistoricalBars(this.selectedInstrumentId!, 'oanda', 1, 'minute', 50).subscribe({
          next: (response: { data: BarData[] }) => {
            this.bars = response.data;
            // console.log('Processed bars:', this.bars);
            this.showChart = true;
          },
          error: (err) => {
            console.error('Error in chart component:', err);
          }
        })
      }
    } else {
      this.selectedInstrument = undefined;
      this.showChart = false;
      this.bars = [];
    }
  }
}
