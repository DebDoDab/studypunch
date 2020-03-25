import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

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

  login() {
    console.log("DSA");
    this.api.login();
    console.log("ASD");
  };

}
