import { Component, OnInit } from '@angular/core';
import {UserContextService} from '../services/user-context.service';

@Component({
  selector: 'app-route-panel',
  templateUrl: './route-panel.component.html',
  styleUrls: ['./route-panel.component.css']
})
export class RoutePanelComponent implements OnInit {

  constructor( private  userContextService: UserContextService) { }

  logged = false;
  admin = false;

  ngOnInit() {
    this.userContextService.isLogged().subscribe( e => {
      this.logged = e;
    });

    this.userContextService.isAdmin().subscribe(e => {
      this.admin = e;
    });
  }

}
