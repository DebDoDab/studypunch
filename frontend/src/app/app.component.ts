import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';

import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  title = 'Study Punch';
  user = new User();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCurrentUser().then(user => {
      console.log(user);
      this.user = user;
    }).catch(err => {});
  }
}
