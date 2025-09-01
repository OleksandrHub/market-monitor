import { Component, OnInit } from '@angular/core';
import { HistoricalChartComponent } from '../historical-chart/historical-chart.component';
import { LivePriceComponent } from '../live-price/live-price.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [HistoricalChartComponent, LivePriceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe({
      next: (response) => {
        this.authService.setTokens(response.access_token, response.refresh_token);
        console.log('Token obtained:', this.authService.getAccessToken());
        // Proceed with other API calls or WebSocket connection using the token
      },
      error: (err) => {
        console.error('Error obtaining token:', err);
      }
    });
  }
}
