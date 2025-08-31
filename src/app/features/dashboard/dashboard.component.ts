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
  ngOnInit() {
    this.authService.login().subscribe(token => {
      console.log('Authenticated with token:', token);
    });
  }
}
