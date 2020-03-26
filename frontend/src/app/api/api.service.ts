import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Homework } from '../models/homework';

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

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router) {}

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
        throw new Error("Need to authenticate");
      });
  }

  async login(): Promise<any> {
    try {
      var x = await this.createJWT();
      console.log(x);
    } catch {
      console.log("@");
      return new Observable((observer) => {
        console.log("string returned");
        observer.next("Login Error");
        observer.complete();
      }).toPromise();
    }
  }

  async getCurrentUser(): Promise<User> {
    await this.setJWT();
    let user = await this.http
      .get(this.baseurl + "auth/users/me/", {headers: this.httpHeaders})
      .toPromise();
    console.log(user);
    return this.http
      .get(this.baseurl + 'users/' + user['id'] + '/', {headers: this.httpHeaders})
      .toPromise()
      .then(resp => {
        return <User>resp;
      });
  }

  async getHomework(): Promise<Array<Homework>> {
    await this.setJWT();
    return this.http
      .get(this.baseurl + "homework/", {headers: this.httpHeaders})
      .toPromise()
      .then(resp => {
        return <Array<Homework>>resp['results'];
      });
  }

  async getUsers(): Promise<Array<User>> {
    await this.setJWT();
    return this.http
      .get(this.baseurl + "users/", {headers: this.httpHeaders})
      .toPromise()
      .then(resp => {
        return <Array<User>>resp['results'];
      });
  }

  async getSubjects(): Promise<Array<Subject>> {
    await this.setJWT();
    return this.http
      .get(this.baseurl + 'subjects/', {headers: this.httpHeaders})
      .toPromise()
      .then(resp => {
        return <Array<Subject>>resp['results'];
      });
  }

  async getSubjectHomework(subjectId: number): Promise<Array<Homework>> {
    await this.setJWT();
    return this.http
      .get(this.baseurl + 'homework/?subject_id' + subjectId, {headers: this.httpHeaders})
      .toPromise()
      .then(resp => {
        return <Array<Homework>>resp['results'];
      });
  }
}
