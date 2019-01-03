import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {LoginComponent} from './login.component';
import {LoginEffects} from '../../core/store/login';
import {loginReducer} from '../../core/store/login/login.reduces';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('loginInfo', loginReducer),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginModule { }
