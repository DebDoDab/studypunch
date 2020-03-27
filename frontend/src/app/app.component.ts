import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { CurrentUserService } from './shared/services/current-user.service';

import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  title = 'Study Punch';
  user: CurrentUserService;

  constructor(private api: ApiService) {
    this.user = new CurrentUserService(this.api);
    this.user.setCurrentUser();
  }

  ngOnInit() {
    console.log(CurrentUserService.user.username);
  }


}
