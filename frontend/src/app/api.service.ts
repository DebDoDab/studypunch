import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://localhost:8000/api/";
  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );
  logindata = {
  	"username": "Vadeb",
  	"password": "qwe",
  };
  token = '';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  checkCookies() {
    return this.cookies;
  }

  checkLogin(): Observable<any> {
    var x = this.http
      .get(this.baseurl + 'auth/login/',
        {headers: this.httpHeaders, observe: 'response', responseType: "text"});
    return x;
  }

  login(): any {
    this.http
      .post(this.baseurl + 'auth/jwt/create/', this.logindata,
        {headers: this.httpHeaders, observe: 'body'})
      .subscribe(x => {
        console.log(x['access']);
        this.token = x['access'];
        this.cookies.set('access_token', this.token);
        console.log(this.httpHeaders);
        this.httpHeaders = this.httpHeaders.set('Authorization', 'JWT ' + this.token);
        console.log(this.httpHeaders);
      });
  }

  getHomework(): Observable<any> {
    console.log(this.httpHeaders);
    return this.http
      .get(this.baseurl + 'homework/', {headers: this.httpHeaders});
  }



}
