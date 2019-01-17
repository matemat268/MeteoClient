import { Component } from '@angular/core';
import {User, UserService} from './services/user.service';
import {LogService} from './services/log.service';
import {UserContextService} from './services/user-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasksList: Array<string> = [];
  tasksDone: Array<string> = [];

  constructor(private userService: UserService, private logService: LogService, private userContextService: UserContextService) {
    this.logService.setUserContextService(this.userContextService);
  }

  add(task: string) {
    this.tasksList.push(task);
  }
  remove(task: string) {
    this.tasksList = this.tasksList.filter(e => e !== task);
  }
  done(task: string) {
    this.tasksDone.push(task);
    this.remove(task);
  }

  getUser() {
    this.userService.getUser().subscribe(user => {
      console.log(user);
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      console.log(users);
    });
  }

  addUser() {
    const u: User = ({
      login: 'test2',
      haslo: 'test',
      email: 'test',
      imie: 'test',
      nazwisko: 'test',
      plec: 't',
      data_ur: null,
    })
    this.userService.addUser(u).subscribe(users => {
      console.log(users);
    });
  }
}

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
