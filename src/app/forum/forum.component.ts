import { Component, OnInit } from '@angular/core';
import {ForumService, Thread} from '../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  threadList: Array<Thread> = [];

  constructor( private forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getThreadList().subscribe( e => {
      this.threadList = e;
      this.threadList.forEach( f => {
        f.posty.forEach( g => {
          g.data = String(g.data).slice(0, 10);
        });
      });
    });
  }

  setThread(thread: Thread) {
    this.forumService.setThread(thread);
  }
}
