import {Component, NgModule, OnInit} from '@angular/core';
import {UserContextService} from '../services/user-context.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  isLooged = false;
  userName: string;
  admin = false;

  constructor(private userContextService: UserContextService) { }

  ngOnInit() {
    this.userContextService.isLogged().subscribe(value => {
      this.isLooged = value;
    });
    this.userContextService.getUserContext().subscribe(value => {
      this.userName = value.imie + ' ' + value.nazwisko;
    });

    this.userContextService.isAdmin().subscribe(e => {
      this.admin = e;
    });
  }

  register() {
  }
}
