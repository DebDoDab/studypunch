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
    "csrfmiddlewaretoken": "OdIybhhUe2i3pIwxF4FEJev2sVzlZ1oDL7L4qng15dyvd3raDQpeSonpAJlvDSX7",
  };

  constructor(private http: HttpClient, private cookies: CookieService) {}

  checkLogin() {
    var x = this.http
      .get(this.baseurl + 'auth/login/', {headers: this.httpHeaders, observe: 'response', responseType: "text"})
      // .subscribe(body => {
      //   let index = body.indexOf("csrfmiddlewaretoken");
      //   let token = body.slice(index + 28, index + 28 + 64);
      //   this.logindata.csrfmiddlewaretoken = token;
      // })
    ;
    // console.log(x.toPromise());
    return x;
  }

  login(): Observable<any> {
    return this.http.post(this.baseurl + 'auth/login/', this.logindata,
      {headers: this.httpHeaders, observe: 'response', responseType: 'text'});
  }



}
