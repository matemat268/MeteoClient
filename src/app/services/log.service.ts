import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.service';
import {UserContextService} from './user-context.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private userContextService: UserContextService;
  private logList: EventEmitter<Array<Log>> = new EventEmitter<Array<Log>>();

  constructor(private http: HttpClient) {
  }

  sendLog(typ: string, opis: string) {
    const user: User = this.userContextService.getUser();
    if (user === undefined || user === null) {
      const u: User = ({id_uzyt: 0});
      const l: Log = ({ id_log: null, uzyt: u, czas: null, typ: typ, opis: opis });
      this.http.post('http://localhost:8080/log', l).subscribe( e => {
      });
    } else {
      const l: Log = ({ id_log: null, uzyt: user, czas: null, typ: typ, opis: opis });
      this.http.post('http://localhost:8080/log', l).subscribe( e => {
      });
    }
  }

  getLogs(): Observable<Array<Log>> {
    this.http.get<Array<Log>>('http://localhost:8080/systemLogs').subscribe( e => {
      e.forEach( f => {
        f.czas = String(f.czas).slice(0, 10);
      });
      this.logList.emit(e);
    });
    return this.logList.asObservable();
  }

  setUserContextService(userContextService: UserContextService) {
    this.userContextService = userContextService;
  }

  getSystemStatistic(): Observable<SystemStatistic> {
    return this.http.get<SystemStatistic>('http://localhost:8080/systemStatistic');
  }
}

export interface Log {
  id_log?: number;
  uzyt?: User;
  czas?: string;
  typ?: string;
  opis?: string;
}

export interface SystemStatistic {
  logInToday?: number;
  logInMonth?: number;
  newUsersToday?: number;
  newUsersMonth?: number;
  newestUser?: User;
}
