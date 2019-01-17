import { Component, OnInit } from '@angular/core';
import {UserContextService} from '../services/user-context.service';
import {User} from '../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor( private userContextService: UserContextService) { }

  user: User;
  newImie: string;
  newNazwisko: string;
  newEmail: string;
  newLogin: string;
  newPassword1: string;
  newPassword2: string;
  password: string;

  ngOnInit() {
    this.user = this.userContextService.getUser();
    if (this.user !== undefined) {
      this.newImie = this.user.imie;
      this.newNazwisko = this.user.imie;
      this.newEmail = this.user.email;
      this.newLogin = this.user.login;
    }
  }

  save() {
    if (this.newImie !== undefined) {
      this.user.imie = this.newImie;
    }
    if (this.newNazwisko !== undefined) {
      this.user.nazwisko = this.newNazwisko;
    }
    if (this.newEmail !== undefined) {
      this.user.email = this.newEmail;
    }
    if (this.newLogin !== undefined) {
      this.user.login = this.newLogin;
    }
    this.userContextService.saveUserData(this.user);
  }

  savePassword() {
    if (this.password === this.user.haslo) {
      if (this.newPassword1 !== undefined) {
        if (this.newPassword1 === this.newPassword2) {
          this.user.haslo = this.newPassword1;
          this.userContextService.changePassword(this.user);
        }
      }
    }
  }

  cancel() {
    this.newImie = this.user.imie;
    this.newNazwisko = this.user.imie;
    this.newEmail = this.user.email;
    this.newLogin = this.user.login;
  }

  delete() {
    if (this.password === this.user.haslo) {
      this.userContextService.deleteAccount();
    }
  }
}
