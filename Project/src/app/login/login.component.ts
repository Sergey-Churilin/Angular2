import { Component, OnInit } from '@angular/core';

import {AuthorizationService} from '../authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: object = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.login();
  }

}
