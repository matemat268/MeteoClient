import { Component, OnInit } from '@angular/core';
import {ActualValues, MeasurementService} from '../services/measurement.service';

@Component({
  selector: 'app-prognoza',
  templateUrl: './prognoza.component.html',
  styleUrls: ['./prognoza.component.css']
})
export class PrognozaComponent implements OnInit {


  values: Array<ActualValues> = [];
  stationId: number;
  temperature = 0;
  windSpeed = 0;
  humidity = 0;
  pressure = 0;

  constructor( private measurementService: MeasurementService ) { }

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
