import { Injectable } from '@angular/core';

import { User } from '../../models/user';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  static user = new User();

  constructor(private api: ApiService) {}

  setCurrentUser(): void {
    this.api.getCurrentUser().then(user => {
      console.log(user);
      CurrentUserService.user = user;
    }).catch(err => {});
  }

  getCurrentUser(): User {
    return CurrentUserService.user;
  }
}
