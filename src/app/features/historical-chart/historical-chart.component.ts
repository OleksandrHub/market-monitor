import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CandleSeriesService,
  CategoryService,
  TooltipService,
  ZoomService,
  ChartModule
} from '@syncfusion/ej2-angular-charts';
import { BarData, ChartBarData } from '../../core/models/asset.model';

@Component({
  selector: 'app-historical-chart',
  imports: [CommonModule, ChartModule],
  providers: [CandleSeriesService, CategoryService, TooltipService, ZoomService],
  templateUrl: './historical-chart.component.html',
  styleUrl: './historical-chart.component.scss'
})
export class HistoricalChartComponent implements OnChanges {
  @Input() bars: BarData[] = [];

  public chartData: ChartBarData[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bars'] && this.bars) {
      console.log('Received bars:', this.bars);
      this.chartData = this.bars.map(bar => ({
        time: new Date(bar.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        open: bar.o,
        high: bar.h,
        low: bar.l,
        close: bar.c,
        volume: bar.v
      }));
    }
  }

  public primaryXAxis: Object = {
    valueType: 'Category',
    title: 'Time',
    majorGridLines: { width: 0 },
  };

  public primaryYAxis: Object = {
    title: 'Price',
    labelFormat: '${value}',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
  };

  // public chartData = [
  //   { time: '09:00', open: 100, high: 110, low: 95, close: 105 },
  //   { time: '10:00', open: 106, high: 115, low: 101, close: 112 },
  //   { time: '11:00', open: 113, high: 118, low: 107, close: 109 },
  //   { time: '12:00', open: 110, high: 120, low: 108, close: 119 },
  //   { time: '13:00', open: 118, high: 125, low: 115, close: 120 }
  // ];
}
