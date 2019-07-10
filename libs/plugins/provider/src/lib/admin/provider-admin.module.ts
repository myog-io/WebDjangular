import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginProviderAdminRoutingModule } from './provider-admin-routing.module';
import { PluginProviderAdminOrdersComponent } from '@plugins/provider/src/lib/admin/components/orders/orders.component';
import { ScaffoldModule } from '@core/builder/src/lib/scaffold/scaffold.module';
import { NbCardModule } from '@nebular/theme';
import { PluginProviderAdminImportResellerComponent } from './components/import-reseller/import-reseller.component';
import { ThemeModule } from '@core/admin/src/lib/@theme';

const MODULES = [
  CommonModule,
  ScaffoldModule,
  NbCardModule,
  PluginProviderAdminRoutingModule,
  ThemeModule
];

const COMPONENTS = [
  PluginProviderAdminOrdersComponent,
  PluginProviderAdminImportResellerComponent
];

@NgModule({
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
  declarations: [...COMPONENTS]
})
export class PluginProviderAdminModule {}
