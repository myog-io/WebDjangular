import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@webdjangular/core/auth';


import { AuthGuard } from '@webdjangular/core/services';
import { AdminModule } from '@webdjangular/core/admin';


const routes: Routes = [
  {
    path: '',
    component: AdminModule,
    canActivate: [AuthGuard],
  }
];
const config: ExtraOptions = {
  useHash: false,

};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
