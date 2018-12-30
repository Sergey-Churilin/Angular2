import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {AppState, getLoginData, getLoginState} from '../../core/store';
import * as LoginActions from '../../core/store/login/login.actions';
import {AuthorizationService} from '../../core/services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public showUserInfo: boolean;
  public userName: string;

  constructor(private store: Store<AppState>, public authService: AuthorizationService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.adjustAuthState();
      }
    });

    this.authService.userInfo
      .subscribe((userInfo: any) => {
          if (userInfo) {
            this.userName = userInfo.email;
          }
          this.adjustAuthState();
        },
        (error) => console.log(error)
      );
  }

  logOut() {
    this.store.dispatch(new LoginActions.Logout());
    // this.authService.logout();
    // this.router.navigate(['../login']);
    // this.adjustAuthState();
  }

  private adjustAuthState() {
    this.showUserInfo = this.router.url !== '/login';
  }
}
