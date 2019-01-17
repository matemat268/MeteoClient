import { Component, OnInit } from '@angular/core';
import {Station, StationsService} from '../services/stations.service';
import {Measurement, MeasurementService} from '../services/measurement.service';
import {Chart} from 'chart.js';
import {ChartService} from '../services/chart.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  private gridApi;
  private rowSelection;

  columnDefs = [
    {headerName: 'Okres', field: 'dzien', width: 120, hide: false, checkboxSelection: true},
    {headerName: 'Temperatura maksymalna', field: 'max_t', width: 220, hide: false},
    {headerName: 'Temperatura minimalna', field: 'min_t', width: 200, hide: false },
    {headerName: 'Temperatura średnia', field: 'sr_t', width: 170, hide: false},
    {headerName: 'Temperatura gruntu', field: 'min_t_gr', width: 170, hide: false },
    {headerName: 'Suma opadów', field: 'sum_opad', width: 120, hide: false},
    {headerName: 'Rodzaj opadów', field: 'rodzaj_opad', width: 140, hide: false },
    {headerName: 'Wysokość pokrywy śnieżnej', field: 'wys_po_sn', width: 250, hide: false}
  ];
  rowData: any;

  agregation = 'D';
  dateFrom: string;
  dateTo: string;
  stationId = 349190625;
  myMeasurement = true;
  sharedMeasurement = true;
  chartType = 'line';

  stations: Array<Station> = [];
  selectedMeasuremests: Array<Measurement> = [];
  chartData = [12, 19, 3, 5, 2, 3];
  chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  chartName = '# of Votes';
  dataType = '1';

  chart: any;

  constructor( private stationService: StationsService, private measurementService: MeasurementService, private chartService: ChartService) { }

  ngOnInit() {
    this.stationService.getStations().subscribe( e => {
      this.stations = e;
    });
    this.rowSelection = 'multiple';
  }

  onGridReady(p) {
    this.gridApi = p.api;
  }

  searchData() {
    let dateF = '';
    dateF = dateF + String(this.dateFrom).slice(11, 15) + '-';
    dateF = dateF + this.measurementService.monthNameToNumber(String(this.dateFrom).slice(4, 7)) + '-';
    dateF = dateF + String(this.dateFrom).slice(8, 10);
    let dateT = '';
    dateT = dateT + String(this.dateTo).slice(11, 15) + '-';
    dateT = dateT + this.measurementService.monthNameToNumber(String(this.dateTo).slice(4, 7)) + '-';
    dateT = dateT + String(this.dateTo).slice(8, 10);

    this.rowData = this.measurementService.getMeasurementsByKryteria(this.agregation, dateF,
      dateT, this.stationId, this.myMeasurement);
  }

  onSelectionChanged() {
    const selMeas = [];
    this.selectedMeasuremests = [];
    this.gridApi.getSelectedRows().forEach( function(selectedRow, index) {
      selMeas.push(selectedRow);
    });
    this.selectedMeasuremests = selMeas;
  }

  openBigChart() {
    this.chartService.setAgregation(this.agregation);
    this.chartService.setChartDataFull(this.selectedMeasuremests);
    this.chartService.setChartLabels(this.chartLabels);
  }
}
