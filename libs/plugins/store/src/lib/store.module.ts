import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginStoreComponent } from './store.component';

const MODULES = [CommonModule];

const COMPONENTS = [PluginStoreComponent];

@NgModule({
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
  declarations: [...COMPONENTS]
})
export class PluginStoreModule {}
