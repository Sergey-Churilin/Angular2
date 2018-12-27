import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public showUserInfo: boolean;

  constructor(public authService: AuthorizationService, private router: Router ) { }

  ngOnInit() {
    this.adjustAuthState();
  }

  logOut() {
    this.authService.logout();
    this.adjustAuthState();
  }

  private adjustAuthState() {
    // this.showUserInfo = this.authService.isAuthenticated();
    // TODO update logic
    this.showUserInfo = this.router.url !== '/login';
    console.log(this.router.url)
  }
}
