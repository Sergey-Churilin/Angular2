import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Subscription} from 'rxjs/internal/Subscription';

import {AuthorizationService} from '../../core/services/authorization.service';

import {AppState} from '../../core/store';
import * as LoginActions from '../../core/store/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  validationMessage: string;
  private valueChangesSub: Subscription;
  private validationMessages = {
    email: {
      required: 'Email address is required.',
      pattern: 'Please enter a valid email address.',
      email: 'Please enter a valid email address.'
    }
  };

  constructor(private store: Store<AppState>, private authService: AuthorizationService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
          Validators.email]
      ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.valueChangesSub = this.loginForm.valueChanges
      .subscribe(v => {
        this.setValidationMessage(this.loginForm.get('email'), 'email');
      });
  }

  ngOnDestroy() {
    this.valueChangesSub.unsubscribe();
  }

  logIn() {
    this.store.dispatch(new LoginActions.Login(this.loginForm.value));
  }

  public hasError(c: FormControl): boolean {
    return !!(c.touched && c.errors);
  }

  private setValidationMessage(c: AbstractControl, controlName: string) {
    this.validationMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[controlName][key])
        .join(' ');
    }
  }

}
