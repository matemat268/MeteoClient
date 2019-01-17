import { Component, OnInit } from '@angular/core';
import {Station} from '../services/stations.service';
import {Papa} from 'ngx-papaparse';
import {Measurement, MeasurementGroup, MeasurementService} from '../services/measurement.service';

@Component({
  selector: 'app-admin-measurement',
  templateUrl: './admin-measurement.component.html',
  styleUrls: ['./admin-measurement.component.css']
})
export class AdminMeasurementComponent implements OnInit {

  columnDefs = [
    {headerName: 'Data dodania', field: 'data_dod', width: 120, hide: false},
    {headerName: 'Id grupy pomiarowej', field: 'id_gr_pom', width: 190, hide: false },
    {headerName: 'Imię użytkownika', field: 'uzyt.imie', width: 180, hide: false },
    {headerName: 'Nazwisko użytkownika', field: 'uzyt.nazwisko', width: 180, hide: false },
    {headerName: 'Login użytkownika', field: 'uzyt.login', width: 180, hide: false }
  ];
  rowData: any;

  files: Array<File> = [];
  newMeasurements: Array<Measurement>;

  constructor( private papa: Papa, private measurementService: MeasurementService ) { }

  ngOnInit() {
    this.getGroups();
  }

  onGridReady(params) {

  }

  onFirstDataRendered(e) {

  }

  onFileInput(file): void {
    this.files.push(file.target.files[0]);
  }

  remove(file): void {
    this.files = this.files.filter(e => e !== file);
  }

  getGroups() {
    this.rowData = this.measurementService.getMeasurementsGroup();
  }

  save() {
    this.newMeasurements = [];
    this.files.forEach( f => {
      this.papa.parse(f, {
        complete: (results, filez) => {
          for (const e of results.data) {
            const as: Array<String>  = String(e[0]).split(',');
            const s: Station = ({id_stacji: Number(String(as[0]))});
            if (as.length === 18)  {
              const m: Measurement = ({
                id_pom: null,
                grupaPomiarow: null,
                dzien: as[2].split('"')[1] + '-' + as[3].split('"')[1] + '-' + as[4].split('"')[1],
                stacja: s,
                max_t: Number(String(as[5])),
                min_t: Number(String(as[7])),
                sr_t: Number(String(as[9])),
                min_t_gr: Number(String(as[11])),
                sum_opad: Number(String(as[13])),
                rodzaj_opad: String(as[15]),
                wys_po_sn: Number(String(as[16])),
                sr_wilg: null,
                sr_pr_wiatr: null,
                sr_zachm: null,
                uslonecz: null
              });
              this.newMeasurements.push(m);
            } else if (as.length === 13) {
              const m: Measurement = ({
                id_pom: null,
                grupaPomiarow: null,
                dzien: as[2].split('"')[1] + '-' + as[3].split('"')[1] + '-' + as[4].split('"')[1],
                stacja: s,
                max_t: null,
                min_t: null,
                sr_t: null,
                min_t_gr: null,
                sum_opad: null,
                rodzaj_opad: null,
                wys_po_sn: null,
                sr_wilg: Number(as[7]),
                sr_pr_wiatr: Number(as[9]),
                sr_zachm: Number(as[11]),
                uslonecz: null
              });
              this.newMeasurements.push(m);
            }
          }
        }
      });
      this.measurementService.saveMeasurements(this.newMeasurements).subscribe(e => {});
    });
  }
}
