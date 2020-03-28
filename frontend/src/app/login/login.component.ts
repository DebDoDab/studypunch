import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Alert } from '../models/alert';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userPipe = CurrentUserService.userPipe;
  response: any;
  headers: any;
  token: string;
  alert: Alert = new Alert();
  loginData = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private api: ApiService) {}

  ngOnInit(): void {

  }

  login() {
    console.log(this.loginData.value);
    this.api.login(this.loginData.value).then(result => {
      console.log("Login Done", result);
      this.alert.set(result.message, result.type);
    }).catch(err => {});
  };

}
