import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {AuthorizationService} from '../../core/services/authorization.service';
import {User} from '../../user.model';

import {AppState, getLoginData, getLoginState} from '../../core/store';
import * as LoginActions from '../../core/store/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public loginData: Partial<User> = {
    email: '',
    password: ''
  };

  constructor(private store: Store<AppState>, private authService: AuthorizationService, private router: Router) { }

  logIn() {
    this.store.dispatch(new LoginActions.Login(<User>this.loginData));
   /* this.authService.login(this.loginData)
      .then(() => {
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        } else {
          this.router.navigate(['../courses']);
        }
      });*/
  }

}
