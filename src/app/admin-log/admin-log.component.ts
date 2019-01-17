import { Component, OnInit } from '@angular/core';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css']
})
export class AdminLogComponent implements OnInit {

  columnDefs = [
    {headerName: 'Data', field: 'czas', width: 120, hide: false},
    {headerName: 'Opis', field: 'opis', width: 300, hide: false },
    {headerName: 'Typ', field: 'typ', width: 80, hide: false}
  ];
  rowData: any;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.rowData = this.logService.getLogs();
  }

  onGridReady(params) {

  }
}
