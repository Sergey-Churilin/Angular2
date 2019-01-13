import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/internal/Subscription';

import {AppState} from '../../core/store';
import * as LoginActions from '../../core/store/login/login.actions';
import {AuthorizationService} from '../../core/services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public showUserInfo: boolean;
  public userName: string;
  private routerSub: Subscription;
  private userInfoSub: Subscription;

  constructor(private store: Store<AppState>, public authService: AuthorizationService, private router: Router) {}

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.adjustAuthState();
      }
    });

    this.userInfoSub = this.authService.userInfo
      .subscribe((userInfo: any) => {
          if (userInfo) {
            this.userName = userInfo.email;
          }
          this.adjustAuthState();
        },
        (error) => console.log(error)
      );
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.userInfoSub.unsubscribe();
  }

  logOut() {
    this.store.dispatch(new LoginActions.Logout());
  }

  private adjustAuthState() {
    this.showUserInfo = this.router.url !== '/login';
  }
}
