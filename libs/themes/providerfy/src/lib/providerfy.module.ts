import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';

import {ThemeProviderfyComponent} from "./providerfy.component";
import {ThemeProviderfyHeaderComponent} from "./components/header/header.component";
import {ThemeProviderfyTopHeaderComponent} from "./components/header/top-header/top-header.component";
import {ThemeProviderfyHeaderMenuComponent} from "./components/header/menu/menu.component";
import {ThemeProviderfyFooterComponent} from "./components/footer/footer.component";
import {ThemeProviderfyBottomFooterComponent} from "./components/footer/bottom-footer/bottom-footer.component";
import {ThemeProviderfySignatureFooterComponent} from "./components/footer/signature-footer/signature-footer.component";

const COMPONENTS = [
  ThemeProviderfyComponent,
  ThemeProviderfyHeaderComponent,
  ThemeProviderfyTopHeaderComponent,
  ThemeProviderfyHeaderMenuComponent,

  ThemeProviderfyFooterComponent,
  ThemeProviderfyBottomFooterComponent,
  ThemeProviderfySignatureFooterComponent

  /*
  ProviderPlansComponent,
  ProviderPricingInternetHorizontalComponent,
  ProviderPricingInternetVerticalComponent,
  ProviderPricingTvVerticalComponent,
  ProviderPricingTelephoneVerticalComponent
  */
];


@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class ThemeProviderfyModule {
}




