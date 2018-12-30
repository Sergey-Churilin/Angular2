import {Action} from '@ngrx/store';
import {User} from '../../../user.model';

export enum LoginActionTypes {
  LOGIN = '[LOGIN] LOGIN',
  LOGIN_SUCCESS = '[LOGIN] LOGIN_SUCCESS',
  LOGIN_ERROR = '[LOGIN] LOGIN_ERROR',
  LOGOUT = '[LOGIN] LOGOUT',
  LOGOUT_SUCCESS = '[LOGIN] LOGOUT_SUCCESS',
  LOGOUT_ERROR = '[LOGIN] LOGOUT_ERROR'
}

export class Login implements Action {
  readonly type = LoginActionTypes.LOGIN;
  constructor(public payload: User) {}
}

export class LoginSuccess implements Action {
  readonly type = LoginActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LoginError implements Action {
  readonly type = LoginActionTypes.LOGIN_ERROR;
  constructor(public payload: Error | string) {}
}
export class Logout implements Action {
  readonly type = LoginActionTypes.LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = LoginActionTypes.LOGOUT_SUCCESS;
  constructor(public payload: User) {}
}

export class LogoutError implements Action {
  readonly type = LoginActionTypes.LOGOUT_ERROR;
  constructor(public payload: Error | string) {}
}

export type LoginActions =
  | Login
  | LoginSuccess
  | LoginError
  | Logout
  | LogoutSuccess
  | LogoutError;
