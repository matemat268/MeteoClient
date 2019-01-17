import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Measurement} from './measurement.service';
import {Log} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  stationDetails: EventEmitter<StationDetails> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getStations(): Observable<Array<Station>> {
    return this.http.get<Array<Station>>('http://localhost:8080/stations');
  }

  saveStations(stations: Array<Station>): Observable<Station> {
    return this.http.post('http://localhost:8080/stations', stations);
  }

  setStationDetail(stationId: number) {
    this.http.get<StationDetails>('http://localhost:8080/stationDetails/' + stationId).subscribe( e => {
      e.maxRainfallDay = String(e.maxRainfallDay).slice(0, 10);
      e.maxTDay = String(e.maxTDay).slice(0, 10);
      e.minTDay = String(e.minTDay).slice(0, 10);
      e.maxWindSpeedDay = String(e.maxWindSpeedDay).slice(0, 10);
      e.lastMeasurement.dzien = String(e.lastMeasurement.dzien).slice(0, 10);
      e.firstMeasurement = String(e.firstMeasurement).slice(0, 10);
      this.stationDetails.emit(e);
    });
  }

  getStationDetail(): Observable<StationDetails> {
    return this.stationDetails.asObservable();
  }
}

export interface Station {
  id_stacji?: number;
  nazwa?: string;
  kod?: string;
}

export interface StationDetails {
  firstMeasurement?: string;
  avgTYmax?: number;
  avgTMmax?: number;
  avgTYmin?: number;
  avgTMmin?: number;
  avgTYavg?: number;
  avgTMavg?: number;
  sumRainfallY?: number;
  sumRainfallM?: number;
  avgHumY?: number;
  avgHumM?: number;
  avgWindSpeedY?: number;
  avgWindSpeedM?: number;
  maxTValue?: number;
  maxTDay?: string;
  minTValue?: number;
  minTDay?: string;
  maxWindSpeedValue?: number;
  maxWindSpeedDay?: string;
  maxRainfallValue?: number;
  maxRainfallDay?: string;
  lastMeasurement?: Measurement;
}
