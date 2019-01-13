import {Component, OnInit, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {Subscription} from 'rxjs/internal/Subscription';

import {AuthorizationService} from '../../core/services/authorization.service';
import {LoginService} from '../../pages/login/login.service';

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

  constructor(public authService: AuthorizationService, private loginService: LoginService, private router: Router) {}

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
    this.loginService.logout();
  }

  private adjustAuthState() {
    this.showUserInfo = this.router.url !== '/login';
  }
}
