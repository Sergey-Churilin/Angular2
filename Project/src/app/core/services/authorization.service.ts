import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

import {User} from '../../user.model';
import {LoadingService} from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  redirectUrl: string;
  userInfo: BehaviorSubject<User> = new BehaviorSubject(this.getUserInfo());
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  login(loginData: Partial<User>) {
    this.loadingService.showLoadingBlock(false);

    return this.addUser(loginData as User)
      .then(user => {
        setTimeout(() => {
          this.loadingService.showLoadingBlock(false);
        }, 1000);
        localStorage.setItem('user', JSON.stringify(user));
        return Promise.resolve(user);
      });
  }

  logout() {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.removeUser(user)
      .then(() => {
        setTimeout(() => {
          this.loadingService.showLoadingBlock(false);
        }, 1000);
        localStorage.clear();
        this.userInfo.next(null);
        return Promise.resolve(user);
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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .post(`${this.baseUrl}profile`, body, options)
      .toPromise()
      .then(response => <User>response)
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error);
      });
  }

  private getUserByEmail(email: string) {
    return this.http.get(`${this.baseUrl}profile?email_like=${email}`)
      .toPromise()
      .then(response => <User>response[0])
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error);
      });
  }

  private removeUser(user: User) {
    return this.http.delete(`${this.baseUrl}profile/${user.id}`)
      .toPromise()
      .then(response => <User>response)
      .catch(error => {
        console.log('Error message');
        return Promise.reject(error.message || error);
      });
  }

  private getUserInfo() {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user) || null;
  }
}
