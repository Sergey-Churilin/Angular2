import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

// rxjs
import {Observable} from 'rxjs/internal/Observable';
import {catchError, concatMap, pluck, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

import {AuthorizationService} from '../../services/authorization.service';
import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private authService: AuthorizationService, private router: Router) {
  }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<LoginActions.Login>(LoginActions.LoginActionTypes.LOGIN),
    pluck('payload'),
    concatMap(payload =>
      this.authService
        .login(payload)
        .pipe(
          map(user => {
            if (this.authService.redirectUrl) {
              this.router.navigate([this.authService.redirectUrl]);
            } else {
              this.router.navigate(['../courses']);
            }
            return new LoginActions.LoginSuccess(user);
          }),
          catchError(err => of(new LoginActions.LoginError(err))))
    ));

  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType<LoginActions.Logout>(LoginActions.LoginActionTypes.LOGOUT),
    pluck('payload'),
    concatMap(() =>
      this.authService
        .logout()
        .pipe(map(user => {
            this.router.navigate(['../login']);
            return new LoginActions.LogoutSuccess(user);
          }),
          catchError(err => of(new LoginActions.LogoutError(err))))
    ));
}
