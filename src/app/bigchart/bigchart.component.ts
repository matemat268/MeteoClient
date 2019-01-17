import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {ChartService} from '../services/chart.service';

@Component({
  selector: 'app-bigchart',
  templateUrl: './bigchart.component.html',
  styleUrls: ['./bigchart.component.css']
})
export class BigchartComponent implements OnInit {

  chart: any;
  chartName = '# of Votes';
  selectedMeasuremests = [];
  agregation = 'D';
  dataType = '1';
  chartData = [12, 19, 3, 5, 2, 3];
  chartLabels = [];
  chartType = 'line';

  constructor( private chartService: ChartService) {
  }

  ngOnInit() {
    this.selectedMeasuremests = this.chartService.getChartDataFull();
    this.chartLabels = this.chartService.getChartLabels();
    this.agregation = this.chartService.getAgregation();
  }

  generateChart() {
    const x = [];
    const y = [];
    if (this.selectedMeasuremests.length > 0) {
      this.selectedMeasuremests.forEach(e => {
        if (this.agregation === 'M') {
          x.push(String(e.dzien).slice(0, 7));
        } else if (this.agregation === 'R') {
          x.push(String(e.dzien).slice(0, 4));
        } else {
          x.push(e.dzien);
        }
        if (this.dataType === '1') {
          y.push(e.max_t);
        } else if (this.dataType === '2') {
          y.push(e.sr_t);
        } else if (this.dataType === '3') {
          y.push(e.min_t);
        } else if (this.dataType === '4') {
          y.push(e.min_t_gr);
        } else if (this.dataType === '5') {
          y.push(e.sum_opad);
        } else if (this.dataType === '6') {
          y.push(e.sr_pr_wiatr);
        } else if (this.dataType === '7') {
          y.push(e.uslonecz);
        } else {
          y.push(e.max_t);
        }
      });
      this.chartData = y;
      this.chartLabels = x;
    }
    if (this.dataType === '1') {
      this.chartName = 'Temperatura maksymalna';
    } else if (this.dataType === '2') {
      this.chartName = 'Temperatura średnia';
    } else if (this.dataType === '3') {
      this.chartName = 'Temperatura minimalna';
    } else if (this.dataType === '4') {
      this.chartName = 'Temperatura minumalna gruntu';
    } else if (this.dataType === '5') {
      this.chartName = 'Suma opadów';
    } else if (this.dataType === '6') {
      this.chartName = 'Średnia predkość wiatru';
    } else if (this.dataType === '7') {
      this.chartName = 'Usłonecznienie';
    } else {
      this.chartName = 'Nie zdefiniowano';
    }
    const ctx = <HTMLCanvasElement>document.getElementById('myChart');
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: this.chartName,
          data: this.chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }
}
