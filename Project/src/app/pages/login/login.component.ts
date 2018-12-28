import { Component, OnInit } from '@angular/core';

import {AuthorizationService} from '../../authorization.service';
import {User} from '../../user.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: Partial<User> = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.login(this.loginData);
    if (this.authService.redirectUrl) {
      this.router.navigate([this.authService.redirectUrl]);
    } else {
      this.router.navigate(['../courses']);
    }
  }

}
