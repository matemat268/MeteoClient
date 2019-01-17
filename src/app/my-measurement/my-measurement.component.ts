import { Component, OnInit } from '@angular/core';
import {Measurement, MeasurementService} from '../services/measurement.service';
import {Papa} from 'ngx-papaparse';
import {Station, StationsService} from '../services/stations.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-my-measurement',
  templateUrl: './my-measurement.component.html',
  styleUrls: ['./my-measurement.component.css']
})

export class MyMeasurementComponent implements OnInit {

  columnDefs = [
    {headerName: 'Data dodania', field: 'data_dod', width: 120, hide: false},
    {headerName: 'Id grupy pomiarowej', field: 'id_gr_pom', width: 190, hide: false },
    {headerName: 'Imię użytkownika', field: 'uzyt.imie', width: 180, hide: false },
    {headerName: 'Nazwisko użytkownika', field: 'uzyt.nazwisko', width: 180, hide: false },
    {headerName: 'Login użytkownika', field: 'uzyt.login', width: 180, hide: false }
  ];
  rowData: any;
  dateFrom: string;
  dateTo: string;
  stationId = 349190625;

  files: Array<File> = [];
  newMeasurements: Array<Measurement>;
  stations: Array<Station> = [];

  constructor( private papa: Papa, private measurementService: MeasurementService, private stationService: StationsService) { }

  ngOnInit() {
    this.getGroups();
    this.stationService.getStations().subscribe( e => {
      this.stations = e;
    });
  }

  onFileInput(file): void {
    this.files.push(file.target.files[0]);
  }

  remove(file): void {
    this.files = this.files.filter(e => e !== file);
  }

  getGroups() {
    this.rowData = this.measurementService.getMyMeasurementsGroup();
  }

  save() {
    this.newMeasurements = [];
    this.papa.parse(this.files[0], {
      complete: (results, filez) => {
        for (const e of results.data) {
          if (e[0] !== '' ) {
            const s: Station = ({id_stacji: Number(String(e[0]))});
            const m: Measurement = ({
              id_pom: null,
              grupaPomiarow: null,
              dzien: e[2] + '-' + e[3] + '-' + e[4],
              stacja: s,
              max_t: Number(String(e[5])),
              min_t: Number(String(e[7])),
              sr_t: Number(String(e[9])),
              min_t_gr: Number(String(e[11])),
              sum_opad: Number(String(e[13])),
              rodzaj_opad: e[15],
              wys_po_sn: Number(String(e[16])),
              sr_wilg: null,
              sr_pr_wiatr: null,
              sr_zachm: null,
              uslonecz: Number(String(e[20]))
            });
            this.newMeasurements.push(m);
          }
        }
      }
    });
    this.measurementService.saveMyMeasurements(this.newMeasurements).subscribe(e => {});
  }

  generateExamples () {
    let dateF = '';
    dateF = dateF + String(this.dateFrom).slice(11, 15) + '-';
    dateF = dateF + this.measurementService.monthNameToNumber(String(this.dateFrom).slice(4, 7)) + '-';
    dateF = dateF + String(this.dateFrom).slice(8, 10);
    let dateT = '';
    dateT = dateT + String(this.dateTo).slice(11, 15) + '-';
    dateT = dateT + this.measurementService.monthNameToNumber(String(this.dateTo).slice(4, 7)) + '-';
    dateT = dateT + String(this.dateTo).slice(8, 10);
    this.measurementService.generateExamples(dateF, dateT, this.stationId).subscribe( e => {
      const data = [];
      let line = '';
      e.forEach( f => {
        line = line + '"' + f.stacja.id_stacji + '",';
        line = line + '"' + f.stacja.nazwa + '",';
        line = line + '"' + String(f.dzien).slice(0, 4) + '",';
        line = line + '"' + String(f.dzien).slice(5, 7) + '",';
        line = line + '"' + String(f.dzien).slice(8, 10) + '",';
        line = line + '"' + f.max_t + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + f.min_t + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + f.sr_t + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + f.min_t_gr + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + f.sum_opad + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + f.rodzaj_opad + '",';
        line = line + '"' + f.wys_po_sn + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + '' + '",';
        line = line + '"' + f.uslonecz + '"';
        line = line + '\r\n';
      });
      data.push(line);
      console.log(data);
      const blob = new Blob([line], {type: 'text/csv' })
      saveAs(blob, 'PrzykladowePomiary.csv');
    });
  }
}
