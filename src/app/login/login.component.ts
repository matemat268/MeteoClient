import { Component, OnInit } from '@angular/core';
import {UserContextService} from '../services/user-context.service';
import {User} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginEmail: string;
  haslo: string;
  error: string;

  constructor(private userContextService: UserContextService) { }

  ngOnInit() {
  }

  loginC() {
    if (this.loginEmail != null && this.haslo != null) {
      const u: User = ({
        login: this.loginEmail.indexOf('@') >= 0 ? null : this.loginEmail,
        haslo: this.haslo,
        email: this.loginEmail.indexOf('@') >= 0 ? this.loginEmail : null,
        imie: null,
        nazwisko: null,
        plec: null,
        data_ur: null,
      });
      this.userContextService.login(u).subscribe(user => {
        if (user.id_uzyt == null) {
          if (user.email === 'ERROR') {
            this.error = 'Nieprawidłowy email';
          }
          if (user.login === 'ERROR') {
            this.error = 'Nieprawidłowy login';
          }
          if (user.haslo === 'ERROR') {
            this.error = 'Nieprawidłowe hasło';
          }
        } else {
          this.error = 'Udało się';
          this.userContextService.setLogged(true);
        }
      });
    }
  }
}
