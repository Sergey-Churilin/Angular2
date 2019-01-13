import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// rxjs
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {delay, tap, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

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

  login(loginData: Partial<User>): Observable<any> {
    this.loadingService.showLoadingBlock(false);

    return this.addUser(loginData as User)
      .pipe(
        delay(1000),
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.loadingService.showLoadingBlock(false);
        })
      );
  }

  logout(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user'));
    return this.removeUser(user)
      .pipe(
        delay(1000),
        tap(() => {
          localStorage.clear();
          this.userInfo.next(null);
          this.loadingService.showLoadingBlock(false);
        })
      );
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }

  private addUser(user: User): Observable<any> {
    return this.getUserByEmail(user.email)
      .pipe(map(existedUser => {
      if (existedUser) {
        return of(existedUser);
      } else {
        return this.createUser(user);
      }
    }));
  }

  private createUser(user: User): Observable<any> {
    user.id = +(Math.random() * 10000).toFixed();
    const body = JSON.stringify(user);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http
      .post(`${this.baseUrl}profile`, body, options);
  }

  private getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}profile?email_like=${email}`)
      .pipe(map(response => of(<User>response[0])));
  }

  private removeUser(user: User): Observable<any> {
    return this.http.delete(`${this.baseUrl}profile/${user.id}`);
  }

  private getUserInfo() {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user) || null;
  }
}
