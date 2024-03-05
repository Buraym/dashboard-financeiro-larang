import { NgIf } from '@angular/common';
import { Component, Input, afterRender } from '@angular/core';
import Chart from 'chart.js/auto';

export interface IChartData {
  label: string,
  color: string;
  data: number;
}

@Component({
  selector: 'chart',
  standalone: true,
  imports: [NgIf],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  chart: any;
  chartId: string = `chart-${new Date().valueOf()}`;
  @Input({required: true}) chartTitle: string = "";
  @Input({required: true}) chartSubtitle: string = "";
  @Input({required: true}) chartData: Array<IChartData> = [];
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
            type: 'doughnut',
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
              labels: this.chartData.map((row) => row.label),
              datasets: [{
                label: this.chartSubtitle,
                data: this.chartData.map((row) => row.data),
                backgroundColor: this.chartData.map((row) => row.color),
                hoverOffset: 4
              }]
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
