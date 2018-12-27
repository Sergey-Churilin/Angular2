import { Component, OnInit } from '@angular/core';

import {AuthorizationService} from '../authorization.service';
import {User} from '../user.model';

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

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.login();
  }

}
