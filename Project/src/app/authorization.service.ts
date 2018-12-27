import { Injectable } from '@angular/core';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }
  // login(user: User) {
  login() {
    // localStorage.setItem('user', JSON.stringify(user));
    console.log('logged in successfully');
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }

  getUserInfo() {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).login;
  }

}
