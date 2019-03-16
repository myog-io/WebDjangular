import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthBlockComponent } from './auth-block/auth-block.component';
import { NbLoginComponent } from './login/login.component';

import { NbResetPasswordComponent } from './reset-password/reset-password.component';
import { NbRegisterComponent } from './register/register.component';
import { NbLogoutComponent } from './logout/logout.component';
import { NbAuthComponent } from './auth.component';
import { NbRequestPasswordComponent } from './request-password/request-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbCardModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  NbAuthComponent,
  NbAuthBlockComponent,
  NbLoginComponent,
  NbRequestPasswordComponent,

  NbResetPasswordComponent,
  NbRegisterComponent,
  NbLogoutComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbCardModule
  ],
  exports: [...COMPONENTS]
})
export class CoreAuthModule {}
