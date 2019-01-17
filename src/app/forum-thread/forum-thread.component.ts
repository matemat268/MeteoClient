import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Attachment, ForumService, Post, Thread} from '../services/forum.service';
import {User, UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {post} from 'selenium-webdriver/http';
import {UserContextService} from '../services/user-context.service';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.css']
})
export class ForumThreadComponent implements OnInit {

  thread: Thread;
  modeInsert: boolean;

  titleText: string;
  postText: string;
  typ: string;

  files: Array<File> = [];

  constructor( private forumService: ForumService, private userService: UserService, private userContextService: UserContextService) {
    this.thread = this.forumService.getThreadSlow();
    if (this.thread === null || this.thread === undefined) {
      this.modeInsert = true;
    } else {
      this.modeInsert = false;
    }
  }

  user: User;
  ngOnInit() {
    this.userContextService.getUserContext().subscribe( e => {
      this.user = e;
    });
  }

  save() {
    const post: Post = ({
      id_postu: null,
      watek: null,
      uzyt: this.user,
      nr_postu: null,
      data: null,
      tresc: this.postText,
      zalaczniki: null,
    });
    if ( this.modeInsert ) {
      const thread: Thread = ({
        id_watku: null,
        data: null,
        tytul: this.titleText,
        typ: this.typ,
        uzyt: this.user,
        posty: [],
      });
      thread.posty.push(post);
      this.forumService.saveThread(thread);
    } else {
      post.watek = this.thread;
      this.forumService.savePost(post);
    }
  }

  onFileInput(file): void {
    this.files.push(file.target.files[0]);
    console.log(this.files);
  }
}
