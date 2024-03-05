import { NgIf } from '@angular/common';
import { Component, Input, afterRender } from '@angular/core';
import Chart from 'chart.js/auto';

export interface IChartDataSets {
  label: string,
  data: Array<number>,
  backgroundColor: Array<string>,
  hoverOffset: number
}

export interface IChartData {
  label: string,
  color: string;
  data: number;
}

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [NgIf],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  chart: any;
  chartId: string = `chart-${new Date().valueOf()}`;
  @Input({required: true}) chartTitle: string = "";
  // @Input({required: true}) chartSubtitle: string = "";
  @Input({required: true}) chartLabels: Array<string> = [];
  @Input({required: true}) chartDataSets: Array<IChartDataSets> = [];
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor() {
    afterRender(() => {
        this.chart = new Chart(
          // @ts-ignore
          document.getElementById(this.chartId),
          {
            type: 'bar',
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: this.chartTitle
                }
              }
            },
            data: {
              labels: this.chartLabels,
              datasets: this.chartDataSets
            },
          }
        );
        this.chart.update();
    });
  }

  ngOnChanges(changes: any) {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
