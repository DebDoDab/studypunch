import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';

import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  title = 'Study Punch';
  user: User = {
    group: -1,
    email: "",
    id: -1,
    username: "Unlogined",
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCurrentUser().then(user => {
      this.user = user;
    });
    console.log(this.user);
  }
}
