import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserService} from './user.service';
import {UserContextService} from './user-context.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  thread: EventEmitter<Thread> = new EventEmitter();
  user: User;
  threadSlow: Thread;

  constructor( private http: HttpClient, private userContextService: UserContextService ) {
    this.userContextService.getUserContext().subscribe( e => {
      this.user = e;
    });
  }

  setThread( thread: Thread ) {
    this.thread.emit(thread);
    this.threadSlow = thread;
  }

  getThread (): Observable<Thread> {
    return this.thread.asObservable();
  }

  getThreadSlow (): Thread {
    return this.threadSlow;
  }

  getThreadList (): Observable<Array<Thread>> {
    return this.http.get<Array<Thread>>('http://localhost:8080/threads');
  }

  saveThread (thread: Thread) {
    thread.uzyt = this.user;
    thread.uzyt = ({});
    this.http.post('http://localhost:8080/addThread', thread).subscribe( e => {
    });
  }

  savePost ( post: Post ) {
    post.uzyt = this.user;
    post.uzyt = ({});
    post.zalaczniki = [];
    this.http.post('http://localhost:8080/addPost', post).subscribe( e => {
    });
  }
}

export interface Thread {
  id_watku?: number;
  uzyt?: User;
  data?: string;
  tytul?: string;
  typ?: string;
  posty?: Array<Post>;
}

export interface Post {
  id_postu?: number;
  watek?: Thread;
  uzyt?: User;
  nr_postu?: number;
  data?: string;
  tresc?: string;
  zalaczniki?: Array<Attachment>;
}

export interface Attachment {
  id_zal?: number;
  post?: Post;
  sciezka?: string;
  typ?: string;
}
