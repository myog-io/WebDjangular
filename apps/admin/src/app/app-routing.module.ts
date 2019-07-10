import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NbResetPasswordComponent } from '@nebular/auth';
import { AuthGuard } from '@core/services/src/lib/auth-guard.service';
import { AdminModule } from '@core/admin/src/lib/admin.module';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent
} from '@core/auth/src/lib';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: '@core/admin/src/lib/admin.module.ts#AdminModule'
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent
      },
      {
        path: 'login',
        component: NbLoginComponent
      },
      {
        path: 'register',
        component: NbRegisterComponent
      },
      {
        path: 'logout',
        component: NbLogoutComponent
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent
      }
    ]
  }
];
const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
