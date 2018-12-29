import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/internal/Subject';

import {User} from '../../user.model';
import {LoadingService} from './loading.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public redirectUrl: string;
  public userInfo: BehaviorSubject<User> = new BehaviorSubject(this.getUserInfo());
  private baseUrl = 'http://localhost:3000/';
  private isAuthorized: boolean = false;

  constructor( private http: HttpClient, private loadingService: LoadingService) { }
  login(loginData: Partial<User>) {
    this.loadingService.showLoadingBlock(false);

    return this.addUser(loginData as User)
      .then(user => {
        setTimeout(() => {
          this.loadingService.showLoadingBlock(false);
        }, 1000);
        localStorage.setItem('user', JSON.stringify(user));
        this.userInfo.next(user);
      });
  }

  logout() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.removeUser(user)
      .then(() => {
        setTimeout(() => {
          this.loadingService.showLoadingBlock(false);
        }, 1000);
        localStorage.clear();
        this.userInfo.next(null);
      });
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
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

  private removeUser(user: User) {
    return this.http.delete(`${this.baseUrl}profile/${user.id}`)
      .toPromise()					        // Observeble to Promise
      .then(response => <User>response)	   // Promise API
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error); // error for the caller
      });
  }

  private getUserInfo() {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user) || null;
  }
}
