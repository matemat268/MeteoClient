import { Injectable } from '@angular/core';
import {Measurement} from './measurement.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  chartData = [];
  chartLabels = [];
  chartName = '';
  chartType = '';
  chartDataFull = [];
  agregation = '';

  setChartData(l: Array<number>) {
    this.chartData = l;
  }

  setChartLabels(l: Array<string>) {
    this.chartLabels = l;
  }

  setChartName(l: string) {
    this.chartName = l;
  }

  setChartType(l: string) {
    this.chartType = l;
  }

  getChartData(): Array<number> {
    return this.chartData;
  }

  getChartLabels(): Array<string> {
    return this.chartLabels;
  }

  getChartName(): string {
    return this.chartName;
  }

  getAgregation(): string {
    return this.agregation;
  }

  setAgregation(l: string) {
    this.agregation = l;
  }

  getChartType(): string {
    return this.chartType;
  }

  setChartDataFull(l: Array<Measurement>) {
    this.chartDataFull = l;
  }

  getChartDataFull(): Array<Measurement> {
    return this.chartDataFull;
  }
}
