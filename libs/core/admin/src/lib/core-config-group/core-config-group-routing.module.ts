import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreConfigGroupComponent } from './core-config-group.component';
import {AuthGuard} from "@webdjangular/core/services";

const routes: Routes = [
  {
    path: '',
    component: CoreConfigGroupComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreConfigRoutingModule {

}
