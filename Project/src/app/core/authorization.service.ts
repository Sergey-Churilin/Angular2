import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../user.model';
import {Course} from "../pages/video-courses-page/course.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public redirectUrl: string;
  private baseUrl = 'http://localhost:3000/';
  private isAuthorized: boolean = false;

  constructor( private http: HttpClient) { }
  login(loginData: Partial<User>) {
    return this.addUser(loginData as User)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
      });
  }

  logout() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.removeUser(user)
      .then(() => {
        localStorage.clear();
      });
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }

  getUserInfo() {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user) || null;
  }

  private addUser(user: User) {
    return this.getUserByEmail(user.email)
      .then((existedUser) => {
        if (existedUser) {
          return Promise.resolve(existedUser);
        } else {
          return this.createUser(user);
        }
    });
  }

  private createUser(user: User) {
    user.id = +(Math.random() * 10000).toFixed();
    const body = JSON.stringify(user);
    const options = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this.http
      .post(`${this.baseUrl}profile`, body, options)
      .toPromise()					        // Observeble to Promise
      .then(response => <User>response)	   // Promise API
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error); // error for the caller
      });
  }

  private getUserByEmail (email: string) {
    return this.http.get(`${this.baseUrl}profile?email_like=${email}`)           // Observable
      .toPromise()					        // Observeble to Promise
      .then(response => <User>response[0])	   // Promise API
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error); // error for the caller
      });
  }

  removeUser(user: User) {
    return this.http.delete(`${this.baseUrl}profile/${user.id}`)
      .toPromise()					        // Observeble to Promise
      .then(response => <User>response)	   // Promise API
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error); // error for the caller
      });
  }
}
