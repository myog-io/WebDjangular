import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PluginProviderAdminRoutingModule} from './provider-admin-routing.module';
import {PluginProviderAdminOrdersComponent} from "@plugins/provider/src/lib/admin/components/orders.component";
import {ScaffoldModule} from "@core/builder/src/lib/scaffold/scaffold.module";
import {NbCardModule} from "@nebular/theme";


const MODULES = [
  CommonModule,
  ScaffoldModule,
  NbCardModule,
  PluginProviderAdminRoutingModule
];

const COMPONENTS = [
  PluginProviderAdminOrdersComponent,


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
