import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LoginState} from './login.state';
export const getLoginState = createFeatureSelector<LoginState>('loginInfo');
export const getLoginData = createSelector(getLoginState, (state: LoginState) => state.userInfo);
export const getLoginError = createSelector(getLoginState, (state: LoginState) => state.error);
