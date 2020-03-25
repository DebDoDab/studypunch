import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = "http://localhost:8000/api/";
  logindata = {
    "username": "Vadeb",
    "password": "qwe",
  };
  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'},
  );

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) {}

  setHeadersAuth(): void {
    if (this.cookies.check('access_token')) {
      this.httpHeaders = this.httpHeaders.set(
        'Authorization', 'JWT ' + this.cookies.get('access_token'),
      );
    }
  }

  setCookiesAuth(response: JSON) {
    if (response['access']) {
      this.cookies.set('access_token', response['access']);
    }
    if (response['refresh']) {
      this.cookies.set('refresh_token', response['refresh']);
    }
    this.setHeadersAuth();
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('login');
  }

  async errorHandle(response: Promise<any>): Promise<any> {
    return response
      .catch(error => {
        console.log("Error occured\n", error['status']);
        return new Promise(() => {throw new Error("Error occured");});
      });
  }

  async createJWT(): Promise<any> {
    return this.http
      .post(this.baseurl + 'auth/jwt/create/',
        this.logindata,
        {headers: this.httpHeaders, observe: 'body'}
    ).toPromise()
      .then(response => {
        this.setCookiesAuth(<JSON>response);
      });
  }

  async refreshJWT(): Promise<any> {
    return this.http
      .post(this.baseurl + 'auth/jwt/refresh/',
        {refresh: this.cookies.get('refresh_token')},
        {headers: this.httpHeaders, observe: 'body'}
    ).toPromise()
      .then(response => {
        this.setCookiesAuth(<JSON>response);
      });
  }

  async verifyJWT(token: string = this.cookies.get('access_token')): Promise<any> {
    return this.http
      .post(this.baseurl + 'auth/jwt/verify/',
        {token: token},
        {headers: this.httpHeaders, observe: 'body'}
    ).toPromise();
  }

  async setJWT(): Promise<any> {
    await this.refreshJWT()
      .then(() => {
        this.setHeadersAuth();
        return;
      }).catch(() => {
        this.redirectToLogin();
      });
  }

  async login(): Promise<any> {
    try {
      await this.createJWT();
    } catch {
      console.log("@");
      return;
    }
  }

  async getCurrentUser(): Promise<any> {
    await this.setJWT();
    return this.http
      .get(this.baseurl + 'auth/users/me/', {headers: this.httpHeaders}).toPromise();
  }

  async getHomework(): Promise<any> {
    await this.setJWT();
    return this.http
      .get(this.baseurl + 'homework/', {headers: this.httpHeaders}).toPromise();
  }

  async getGroup(): Promise<any> {
    await this.setJWT();
    return this.http
      .get(this.baseurl + 'groups/', {headers: this.httpHeaders}).toPromise();
  }





}
