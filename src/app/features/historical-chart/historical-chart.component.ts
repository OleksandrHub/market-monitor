import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { HistoricalService } from '../../core/services/historical.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { enUS } from 'date-fns/locale';

// Реєструємо Chart.js компоненти
Chart.register(...registerables);

@Component({
  selector: 'app-historical-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './historical-chart.component.html',
  styleUrl: './historical-chart.component.scss'
})
export class HistoricalChartComponent implements OnChanges {
  @Input() instrument: any = null;
  @Input() isSubscribed: boolean = false;

  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [],
        label: 'Close Price',
        fill: false,
        tension: 0.5,
        borderColor: [],
        pointBackgroundColor: [],
        pointBorderColor: []
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Index'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price'
        }
      }
    }
  };
  public lineChartType: ChartType = 'line';

  constructor(private historicalService: HistoricalService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instrument'] && this.instrument) {
      const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      this.historicalService.getHistoricalBars(this.instrument.id, 'oanda', 1, 'minute', startDate).subscribe({
        next: (response: any) => {
          const bars = response.data || [];
          console.log('Received bars:', bars);
          this.updateChart(bars);
        },
        error: (err: any) => {
          console.error('Error in chart component:', err);
        }
      });
    }
  }

  private updateChart(bars: any[]): void {
    const labels = bars.map((_, index) => index);
    const data = bars.map(bar => bar.close);

    const borderColors: string[] = [];
    const pointColors: string[] = [];

    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        borderColors.push('gray'); // Перша точка - нейтральний колір
        pointColors.push('gray');
      } else if (data[i] > data[i - 1]) {
        borderColors.push('green'); // Зростання
        pointColors.push('green');
      } else {
        borderColors.push('red'); // Падіння
        pointColors.push('red');
      }
    }

    console.log('Chart labels:', labels, 'Chart data:', data, 'Border colors:', borderColors);

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Close Price',
          fill: false,
          tension: 0.5,
          borderColor: borderColors,
          pointBackgroundColor: pointColors,
          pointBorderColor: pointColors,
          segment: {
            borderColor: (ctx) => borderColors[ctx.p1DataIndex] // Колір для сегментів між точками
          }
        }
      ]
    };
  }
}