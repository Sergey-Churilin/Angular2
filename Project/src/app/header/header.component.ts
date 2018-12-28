import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public showUserInfo: boolean;
  public userName: string;

  constructor(public authService: AuthorizationService, private router: Router ) { }

  ngOnInit() {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.adjustAuthState();
      }
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['../login']);
    this.adjustAuthState();
  }

  private adjustAuthState() {
    this.showUserInfo = this.router.url !== '/login';
    const userInfo =  this.authService.getUserInfo();
    if (userInfo) {
      this.userName = userInfo.email;
    }
  }
}
