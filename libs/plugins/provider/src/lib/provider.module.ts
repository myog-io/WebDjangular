import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PluginProviderComponent} from "./provider.component";
import {PluginProviderCheckoutModule} from "./components/checkout/checkout.module";

import {PluginProviderPlansComponent} from "./components/plans/plans.component";
import {PluginProviderPricingInternetHorizontalComponent} from "./components/plans/pricing/internet-horizontal/internet-horizontal.component";
import {PluginPricingComboVerticalComponent} from "./components/plans/pricing/combo-vertical/combo-vertical.component";
import {PluginProviderPricingInternetVerticalComponent} from "./components/plans/pricing/internet-vertical/internet-vertical.component";
import {PluginProviderPricingTelephoneVerticalComponent} from "./components/plans/pricing/telephone-vertical/telephone-vertical.component";
import {PluginProviderPricingTvVerticalComponent} from "./components/plans/pricing/tv-vertical/tv-vertical.component";


const MODULES = [
  CommonModule,
  PluginProviderCheckoutModule
];

const COMPONENTS = [
  PluginProviderComponent,

  PluginProviderPlansComponent,
  PluginProviderPricingInternetHorizontalComponent,
  PluginPricingComboVerticalComponent,
  PluginProviderPricingInternetVerticalComponent,
  PluginProviderPricingTelephoneVerticalComponent,
  PluginProviderPricingTvVerticalComponent

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
