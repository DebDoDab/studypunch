import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response: any;
  headers: any;
  token: string;
  // config: any;
  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  checkLogin() {
    // this.api.checkLogin().subscribe(x => this.response = x);
    // this.api.checkLogin()
    //   .subscribe(resp => {
    //     console.log(resp.headers);
    //   // display its headers
    //   const keys = resp.headers.keys();
    //   this.headers = keys.map(key =>
    //     `${key}: ${resp.headers.get(key)}`);
    // });
    // console.log(this.headers);
  };

  getCookies() {
    console.log(this.api.checkCookies());
  }

  login() {
    this.api.login();
  };

}
