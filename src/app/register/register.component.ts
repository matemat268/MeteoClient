import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../services/user.service';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imie: string;
  nazwisko: string;
  email: string;
  plec: string;
  data_ur: string;
  login: string;
  haslo: string;
  hasloACK: string;
  error: string;

  constructor(private userService: UserService, private logService: LogService) { }

  ngOnInit() {
  }

  register() {
    if (this.haslo === this.hasloACK) {
      const u: User = ({
        login: this.login,
        haslo: this.haslo,
        email: this.email,
        imie: this.imie,
        nazwisko: this.nazwisko,
        plec: this.plec.charAt(0),
        data_ur: this.data_ur,
      });
      this.userService.addUser(u).subscribe(user => {
        if (user.id_uzyt == null) {
          if (user.login != null) {
            this.error = 'Istnieje już w systemie użytkownik o takim loginie. Spróbuj inny';
          }
          if (user.email != null) {
            this.error = 'Istnieje już w systemie użytkownik o takim emailu. Spróbuj inny';
          }
        } else  {
          this.error = null;
          this.logService.sendLog('REG', 'User registered');
        }
      });
    }
  }
}
