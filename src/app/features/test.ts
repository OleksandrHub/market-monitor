import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';

// Реєструємо лише основні компоненти Chart.js (без адаптера дати)
Chart.register(...registerables);

@Component({
    selector: 'app-test-chart',
    standalone: true,
    imports: [BaseChartDirective, CommonModule],
    template: `
    <div>
      <h2>Test Chart</h2>
      <canvas baseChart
        [data]="lineChartData"
        [options]="lineChartOptions"
        [type]="lineChartType">
      </canvas>
    </div>
  `,
    styles: [
        `
      div {
        margin: 20px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      h2 {
        font-size: 1.5em;
        margin-bottom: 10px;
      }
      canvas {
        max-height: 400px;
        width: 100%;
        min-height: 200px;
      }
    `
    ]
})
export class TestChartComponent implements OnInit {
    public lineChartData: ChartData<'line'> = {
        datasets: [
            {
                data: [],
                label: 'Close Price',
                fill: false,
                tension: 0.5,
                borderColor: 'blue',
                backgroundColor: 'rgba(0,0,255,0.3)'
            }
        ]
    };
    public lineChartOptions: ChartConfiguration['options'] = {
        scales: {
            x: {
                type: 'linear', // Використовуємо linear замість time
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

    ngOnInit(): void {
        const mockBars = this.getMockBars();
        console.log('Mock bars:', mockBars);
        this.updateChart(mockBars);
    }

    private getMockBars(): any[] {
        const now = new Date();
        return Array.from({ length: 10 }, (_, i) => {
            const timestamp = new Date(now.getTime() - i * 60000);
            return {
                timestamp: timestamp.toISOString(),
                close: 1.1020 + Math.random() * 0.01
            };
        }).reverse();
    }

    private updateChart(bars: any[]): void {
        const labels = bars.map((_, index) => index); // Використовуємо індекси замість дат
        const data = bars.map(bar => bar.close);

        console.log('Chart labels:', labels, 'Chart data:', data);

        this.lineChartData = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    label: 'Close Price',
                    fill: false,
                    tension: 0.5,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0,0,255,0.3)'
                }
            ]
        };
    }
}