import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../app.component';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userlist: EventEmitter<Array<User>> = new EventEmitter<Array<User>>();
  userInfolist: EventEmitter<Array<UserInfo>> = new EventEmitter<Array<UserInfo>>();

  constructor(private http: HttpClient, private logService: LogService) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/user');
  }

  getUsers(): Observable<Array<User>> {
    this.http.get<Array<User>>('http://localhost:8080/users').subscribe( e => {
      e.forEach( f => {
        f.data_ur = String(f.data_ur).slice(0, 10);
      });
      this.userlist.emit(e);
    });
    return this.userlist.asObservable();
  }

  getUsersInfo(): Observable<Array<UserInfo>> {
    this.http.get<Array<UserInfo>>('http://localhost:8080/usersInfo').subscribe( e => {
      e.forEach( f => {
        f.data_ur = String(f.data_ur).slice(0, 10);
        f.data_ost = String(f.data_ost).slice(0, 10);
        f.data_rej = String(f.data_rej).slice(0, 10);
      });
      this.userInfolist.emit(e);
    });
    return this.userInfolist;
  }

  addUser( user: User): Observable<User> {
    return this.http.post('http://localhost:8080/users', user);
  }

  delete( id: number ) {
    console.log(id);
    this.logService.sendLog('DLA', 'User deleted by admin');
    this.http.delete<Boolean>('http://localhost:8080/deleteUser/' + id).subscribe();
  }

  makeAdmin( id: number ) {
    this.http.post('http://localhost:8080/makeAdmin', id).subscribe();
  }
}

export interface User {
  id_uzyt?: number;
  login?: string;
  haslo?: string;
  email?: string;
  imie?: string;
  nazwisko?: string;
  plec?: string;
  data_ur?: string;
}

export interface UserInfo {
  id_uzyt?: number;
  login?: string;
  email?: string;
  imie?: string;
  nazwisko?: string;
  plec?: string;
  data_ur?: string;
  data_rej?: string;
  data_ost?: string;
  admin?: string;
}
