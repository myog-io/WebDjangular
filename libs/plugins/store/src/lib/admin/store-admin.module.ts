import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreAdminRoutingModule } from './store-admin-routing.module';

const MODULES = [CommonModule, StoreAdminRoutingModule];

const COMPONENTS = [];

@NgModule({
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
  declarations: [...COMPONENTS]
})
export class PluginStoreAdminModule {}
