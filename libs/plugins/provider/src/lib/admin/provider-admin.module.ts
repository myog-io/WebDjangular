import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PluginProviderAdminRoutingModule } from './provider-admin-routing.module';



const MODULES = [
  CommonModule,
  PluginProviderAdminRoutingModule
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
export class PluginProviderAdminModule {
}
