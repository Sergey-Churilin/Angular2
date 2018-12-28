import { Injectable } from '@angular/core';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public redirectUrl: string;

  constructor() { }
  // login(user: User) {
  login(loginData: Partial<User>) {
    localStorage.setItem('user', JSON.stringify(loginData));
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
    return user && JSON.parse(user) || null;
  }

}
