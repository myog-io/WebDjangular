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


import { AuthGuard } from '@webdjangular/core/services'


const routes: Routes = [
  {
    path: '',
    loadChildren: '@webdjangular/core/admin/admin.module#AdminModule',
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
