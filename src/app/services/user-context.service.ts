import {EventEmitter, Injectable} from '@angular/core';
import {User, UserService} from './user.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Log, LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  constructor(private userService: UserService, private http: HttpClient, private logService: LogService) {
    this.loggedIn.next(false);
  }

  private userContext = new EventEmitter<User>();
  private loggedIn = new EventEmitter<boolean>();
  private admin = new EventEmitter<boolean>();
  private user: User;

  getUserContext(): Observable<User> {
    return this.userContext.asObservable();
  }

  login(user: User): Observable<User> {
    let url: string;
    url = 'http://localhost:8080/login';
    if (user.login != null) {
      url = url + '/' + user.login;
    } else {
      url = url + '/null';
    }
    if (user.email != null) {
      url = url + '/' + user.email;
    } else {
      url = url + '/null';
    }
    url = url + '/' + user.haslo;
    this.http.get<User>(url).subscribe(user2 => {
      this.userContext.emit(user2);
      this.user = user2;
      this.loggedIn.next(true);
      this.logService.sendLog('LOG', 'User logged');
      this.http.get<boolean>('http://localhost:8080/isAdmin/' + this.user.id_uzyt).subscribe( f => {
        this.admin.next(f);
      });
    });
    return this.userContext.asObservable();
  }

  setLogged(value: boolean) {
    this.loggedIn.next(value);
  }

  isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }

  getUserId(): number {
    return this.user.id_uzyt;
  }

  public getUser(): User {
    return this.user;
  }

  public saveUserData(u: User) {
    this.logService.sendLog('CHD', 'User data changed');
    this.http.put<User>('http://localhost:8080/changeUserData', u).subscribe( e => {
      this.userContext.emit(e);
      this.user = e;
    });
  }

  public changePassword(u: User) {
    this.logService.sendLog('CHP', 'User password changed');
    this.http.put<User>('http://localhost:8080/changeUserPassword', u).subscribe( e => {
      this.userContext.emit(e);
      this.user = e;
    });
  }

  public deleteAccount() {
    this.logService.sendLog('DLH', 'User deleted by himself');
    this.http.delete<Boolean>('http://localhost:8080/deleteUser/' + this.user.id_uzyt).subscribe( e => {
      this.loggedIn.emit(false);
      this.userContext.emit(null);
      this.user = null;
      this.admin.emit(null);
    });
  }
}

