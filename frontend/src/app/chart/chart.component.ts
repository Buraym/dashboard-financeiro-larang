import { AfterRenderPhase, Component, Input, afterRender } from '@angular/core';
import Chart from 'chart.js/auto';

export interface IChartData {
  label: string,
  color: string;
  data: number;
}

@Component({
  selector: 'chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  chartId: string = `chart-${new Date().valueOf()}`;
  dashboardChart: any;
  @Input({required: true}) chartTitle: string = "";
  @Input({required: true}) chartSubtitle: string = "";
  @Input({required: true}) chartData: Array<IChartData> = [];
  chartOptions: any;
  constructor() {
    this.chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    afterRender(() => {
      if (window && typeof window !== "undefined") {
        this.dashboardChart = new Chart(
          // @ts-ignore
          window.document.getElementById(this.chartId),
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
          });
      }

    }, {phase: AfterRenderPhase.Write});
  }
}
