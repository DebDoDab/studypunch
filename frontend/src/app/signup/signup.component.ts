import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../shared/services/current-user.service';
import { Alert } from '../models/alert';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  alert: Alert = new Alert();
  signupData = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    passwordConfirm: new FormControl(""),
    group_token: new FormControl(""),
  });

  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  signup() {
    console.log(this.signupData);
    if (this.signupData.get('password').value !== this.signupData.get('passwordConfirm').value) {
      this.alert.set("Passwords don't match", "danger");
      return;
    } else if (this.signupData.get('password').value.length < 8) {
      this.alert.set("Password should be at least 8 symbols", "danger");
      return;
    }
    this.api.signup(this.signupData.value).then(result => {
      console.log("Login Done", result);
      this.alert.set(result.message, result.type);
    }).catch(err => {});
  };

  loginClick() {
    this.router.navigateByUrl('login');
  }

}
