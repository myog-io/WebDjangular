import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsCoreAdminRoutingModule } from './cms-admin-routing.module';

const MODULES = [
  CommonModule,
  CmsCoreAdminRoutingModule,
];

const COMPONENTS = [

];


@NgModule({
  imports: [...MODULES],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  declarations: [...COMPONENTS]
})
export class CmsCoreAdminModule {
}
