import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

import { Alert } from '../interfaces/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response: any;
  headers: any;
  token: string;
  alert: Alert = new Alert();

  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  login() {
    console.log("DSA");
    this.api.login().then(result => {
      console.log("@@@@@@@@@@@@@");
      console.log(result, "1");
      this.alert.set(result);
      console.log(this.alert, "2");
    }).catch(err => {});
    console.log("ASD");
  };

}
