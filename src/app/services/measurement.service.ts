import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.service';
import { Station } from './stations.service';
import {UserContextService} from './user-context.service';
import {Log} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  measurementByCriteria: EventEmitter<Array<Measurement>> = new EventEmitter<Array<Measurement>>();

  private measurementsGroup: EventEmitter<Array<MeasurementGroup>> = new EventEmitter<Array<MeasurementGroup>>();

  constructor(private http: HttpClient, private userContext: UserContextService) {
  }

  saveMeasurements(measurements: Array<Measurement>): Observable<MeasurementGroup> {
    const u: User = ({
      id_uzyt: this.userContext.getUserId(),
    });
    const m: MeasurementGroup = ({
      pomiary: null,
      data_dod: null,
      id_gr_pom: null,
      uzyt: u,
    });
    const mg: Observable<MeasurementGroup> = this.http.post('http://localhost:8080/measurementGroup', m);
    mg.subscribe(e => {
      for (const measurement of measurements) {
        measurement.grupaPomiarow = e;
      }
      this.http.post('http://localhost:8080/measurement', measurements).subscribe();
    });
    return mg;
  }

  getMeasurementsGroup(): Observable<Array<MeasurementGroup>> {
    this.http.get<Array<MeasurementGroup>>('http://localhost:8080/measurementGroup').subscribe( e => {
      e.forEach( f => {
        f.data_dod = String(f.data_dod).slice(0,10);
      });
      this.measurementsGroup.emit(e);
    });
    return this.measurementsGroup.asObservable();
  }

  getMeasurementsByKryteria(agregation: string, dateFrom: string, dateTo: string, stationId: number,
                            myMeasurement: boolean): Observable<Array<Measurement>> {
    this.http.get<Array<Measurement>>('http://localhost:8080/measurements'
      + '/' + agregation + '/' + dateFrom + '/' + dateTo
      + '/' + stationId + '/' + myMeasurement ).subscribe( e => {
      e.forEach( f => {
        f.dzien = String(f.dzien).slice(0, 10);
      });
      this.measurementByCriteria.emit(e);
    });
    return this.measurementByCriteria.asObservable();
  }

  getStationsActual(): Observable<Array<ActualValues>> {
    return this.http.get<Array<ActualValues>>('https://danepubliczne.imgw.pl/api/data/synop');
  }

  saveMyMeasurements(measurements: Array<Measurement>): Observable<MeasurementGroup> {
    const u: User = ({
      id_uzyt: 1
    });
    //nowa grupa pomiarowa
    const m: MeasurementGroup = ({
      pomiary: null,
      data_dod: null,
      id_gr_pom: null,
      uzyt: u
    });
    //zapis grupy pomiarowej do serwera
    const mg: Observable<MeasurementGroup> = this.http.post('http://localhost:8080/myMeasurementGroup', m);
    mg.subscribe(e => {
      //przypisanie pomiaaarom grupy pomiarowej i ich zapis do serwera
      for (const measurement of measurements) {
        measurement.grupaPomiarow = e;
      }
      this.http.post('http://localhost:8080/measurement', measurements);
    });
    return mg;
  }

  getMyMeasurementsGroup(): Observable<Array<MeasurementGroup>> {
    return this.http.get<Array<MeasurementGroup>>('http://localhost:8080/myMeasurementGroup' + '/' + this.userContext.getUserId());
  }

  generateExamples(data_od: string, data_do: string, stationId: number): Observable<Array<Measurement>> {
    return this.http.get<Array<Measurement>>('http://localhost:8080/exampleMeasurements' + '/' + data_od + '/' + data_do + '/' + stationId);
  }

  monthNameToNumber(name: string): string {
    switch (name) {
      case 'Jan': return '01';
        break;
      case 'Feb': return '02';
        break;
      case 'Mar': return '03';
        break;
      case 'Apr': return '04';
        break;
      case 'May': return '05';
        break;
      case 'Jun': return '06';
        break;
      case 'Jul': return '07';
        break;
      case 'Aug': return '08';
        break;
      case 'Sep': return '09';
        break;
      case 'Oct': return '10';
        break;
      case 'Nov': return '11';
        break;
      case 'Dec': return '12';
        break;
    }
  }
}

export interface Measurement {
  id_pom?: number;
  grupaPomiarow?: MeasurementGroup;
  dzien?: string;
  stacja?: Station;
  max_t?: number;
  min_t?: number;
  sr_t?: number;
  min_t_gr?: number;
  sum_opad?: number;
  rodzaj_opad?: string;
  wys_po_sn?: number;
  sr_wilg?: number;
  sr_pr_wiatr?: number;
  sr_zachm?: number;
  uslonecz?: number;
}

export interface MeasurementGroup {
  id_gr_pom?: number;
  uzyt?: User;
  data_dod?: string;
  pomiary?: Array<Measurement>;
}

export interface ActualValues {
  id_stacji?: number;
  stacja?: string;
  temperatura?: number;
  predkosc_wiatru?: number;
  wilgotnosc_wzgledna?: number;
  cisnienie?: number;
}
