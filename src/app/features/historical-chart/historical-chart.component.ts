import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { createChart, IChartApi, ISeriesApi, } from 'lightweight-charts';
import { BarData } from '../../core/models/asset.model';

@Component({
  selector: 'app-historical-chart',
  imports: [],
  templateUrl: './historical-chart.component.html',
  styleUrl: './historical-chart.component.scss'
})
export class HistoricalChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;
  @Input() bars: BarData[] = [];

  private chart!: IChartApi;
  private series!: ISeriesApi<'Candlestick'>;

  ngAfterViewInit(): void {
    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: 400,
      layout: { background: { color: '#fff' }, textColor: '#333' },
      grid: { vertLines: { color: '#eee' }, horzLines: { color: '#eee' } },
      timeScale: { borderColor: '#ccc' }
    });

    this.series = (this.chart as any).addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    if (this.bars.length > 0) {
      this.series.setData(this.bars);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bars'] && this.series) {
      this.series.setData(this.bars);
    }
  }

}
