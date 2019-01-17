import { Component, OnInit } from '@angular/core';
import {Station, StationsService} from '../services/stations.service';
import {ActualValues, MeasurementService} from '../services/measurement.service';
import {isNumber} from 'util';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  values: Array<ActualValues> = [];
  stationId: number;
  temperature = 0;
  windSpeed = 0;
  humidity = 0;
  pressure = 0;

  constructor( private stationService: StationsService, private measurementService: MeasurementService) { }

  ngOnInit() {
    this.measurementService.getStationsActual().subscribe( e => {
      this.values = e;
    });
  }

  selectionChange() {
    if ( this.stationId > 0 ) {
      this.values.filter( e => {
        if ( e.id_stacji === this.stationId ) {
          this.temperature = e.temperatura;
          this.windSpeed = e.predkosc_wiatru;
          this.humidity = e.wilgotnosc_wzgledna;
          this.pressure = e.cisnienie;
        }
      });
    }
  }
}
