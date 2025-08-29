import { Component } from '@angular/core';
import { HistoricalChartComponent } from '../historical-chart/historical-chart.component';
import { LivePriceComponent } from '../live-price/live-price.component';

@Component({
  selector: 'app-dashboard',
  imports: [HistoricalChartComponent, LivePriceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
