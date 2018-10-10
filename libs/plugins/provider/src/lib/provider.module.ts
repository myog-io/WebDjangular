import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PluginProviderComponent} from "./provider.component";
import {PluginProviderCheckoutModule} from "./components/checkout/checkout.module";

const MODULES = [
  CommonModule,
  PluginProviderCheckoutModule
];

const COMPONENTS = [
  PluginProviderComponent

];


@NgModule({
  imports: [...MODULES],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  declarations: [...COMPONENTS]
})
export class PluginProviderModule {
}
