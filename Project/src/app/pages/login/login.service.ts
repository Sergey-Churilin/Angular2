import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

import * as LoginActions from '../../core/store/login/login.actions';
import {AppState} from '../../core/store';

import {LoginModule} from './login.module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private store: Store<AppState>) { }

  login(value) {
    this.store.dispatch(new LoginActions.Login(value));
  }

  logout() {
    this.store.dispatch(new LoginActions.Logout());
  }
}
