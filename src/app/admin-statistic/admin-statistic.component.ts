import { Component, OnInit } from '@angular/core';
import {LogService, SystemStatistic} from '../services/log.service';
import {UserContextService} from '../services/user-context.service';

@Component({
  selector: 'app-admin-statistic',
  templateUrl: './admin-statistic.component.html',
  styleUrls: ['./admin-statistic.component.css']
})
export class AdminStatisticComponent implements OnInit {


  admin = false;
  systemstats: SystemStatistic;

  constructor( private logService: LogService, private userContextService: UserContextService) { }

  ngOnInit() {
    this.logService.getSystemStatistic().subscribe( e => {
      this.systemstats = e;
    });
    this.userContextService.isAdmin().subscribe( e => {
      this.admin = e;
    });
  }

  onGridReady(params) {

  }
}
