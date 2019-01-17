import {Component, OnInit } from '@angular/core';
import {Station, StationsService} from '../services/stations.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-admin-stations',
  templateUrl: './admin-stations.component.html',
  styleUrls: ['./admin-stations.component.css']
})
export class AdminStationsComponent implements OnInit {

  files: Array<File> = [];
  newStations: Array<Station>;

  constructor( private stationService: StationsService, private papa: Papa ) { }

  ngOnInit() {
  }

  onFileInput(file): void {
    this.files.push(file.target.files[0]);
  }

  remove(file): void {
    this.files = this.files.filter(e => e !== file);
  }

  save() {
    this.newStations = [];
    console.log(this.newStations);
    this.papa.parse(this.files[0], {
      complete: (results, filez) => {
        let i = 0;
        while (results.data[i]) {
          if (results.data[i][2] !== '' ) {
            const s: Station = ({
              id_stacji: Number(String(results.data[i][0]).replace('"', '')).valueOf(),
              nazwa: String(results.data[i][1]).replace('"', ''),
              kod: String(results.data[i][2]).replace('"', '')
            });
            this.newStations.push(s);
            i++;
          }
        }
        this.stationService.saveStations(this.newStations).subscribe( e => {});
      }
    });
  }
}

