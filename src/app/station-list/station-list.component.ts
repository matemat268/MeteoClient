import {Component, OnInit, ViewChild} from '@angular/core';
import {Station, StationsService} from '../services/stations.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  stations: Array<Station> = [];

  rowSelection = 'single';

  columnDefs = [
    {headerName: 'Id stacji', field: 'id_stacji', width: 120, hide: false},
    {headerName: 'Nazwa', field: 'nazwa', width: 300, hide: false },
    {headerName: 'Kod', field: 'kod', width: 80, hide: false}
  ];
  columnDefsHidden = [
    {headerName: 'Id stacji', field: 'id_stacji', width: 120, hide: true},
    {headerName: 'Nazwa', field: 'nazwa', width: 300, hide: false },
    {headerName: 'Kod', field: 'kod', width: 80, hide: false}
  ];
  rowData: any;

  constructor( private stationService: StationsService ) { }

  mode = 'admin';
  hideId = this.mode !== 'admin';

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.columnDefs[0].hide = this.hideId;
    if (this.mode !== 'admin') {
      params.api.setColumnDefs(this.columnDefsHidden);
    } else {
      params.api.setColumnDefs(this.columnDefs);
    }
  }

  onFirstDataRendered(params) {
  }

  ngOnInit() {

    this.getStations();
  }

  getStations() {
    this.rowData = this.stationService.getStations();
  }

  onSelectionChanged() {
    let id: number;
    this.gridApi.getSelectedRows().forEach( function(selectedRow, index) {
      id = selectedRow.id_stacji;
    });
    this.stationService.setStationDetail(id);
  }
}
