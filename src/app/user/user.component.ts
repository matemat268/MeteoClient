import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: Array<User> = [];
  imie: string;
  nazwisko: string;
  plec: string;
  data_ur: string;
  email: string;
  login: string;
  haslo: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser() {
    const u: User = ({
      login: this.login,
      haslo: this.haslo,
      email: this.email,
      imie: this.imie,
      nazwisko: this.nazwisko,
      plec: this.plec.charAt(0),
      data_ur: this.data_ur,
    });
    console.log(this.data_ur);
    this.userService.addUser(u).subscribe(users => {
      console.log(users);
    });

  }
}
