import { Component, OnInit } from '@angular/core';
import {StationDetails, StationsService} from '../services/stations.service';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent implements OnInit {

  stationDetails: StationDetails = {};

  constructor( private stationService: StationsService ) { }

  ngOnInit() {
    if ( this.stationService.getStationDetail() !== undefined ) {
      this.stationService.getStationDetail().subscribe(e => {
        this.stationDetails = e;
      });
    }
  }

}
