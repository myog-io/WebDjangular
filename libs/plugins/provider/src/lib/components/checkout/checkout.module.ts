import "reflect-metadata";
import {NgModule} from '@angular/core';
//import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {PluginProviderCheckoutComponent} from "./checkout.component";

import {PluginProviderCheckoutPlansComponent} from "./plans/plans.component";
import {PluginProviderCheckoutSummaryComponent} from "./summary/summary.component";
import {PluginProviderCheckoutPlanInternetComponent} from "./plans/internet/internet.component";
import {PluginProviderCheckoutPlanInternetOptionalComponent} from "./plans/internet/optional/optional.component";
import {PluginProviderCheckoutPlanTelephoneComponent} from "./plans/telephone/telephone.component";
import {PluginProviderCheckoutPlanTelevisionComponent} from "./plans/television/television.component";
import {PluginProviderCheckoutPlanTelevisionOptionalComponent} from "./plans/television/optional/optional.component";
import {PluginProviderCheckoutWizardComponent} from "./wizard/wizard.component";
import {PluginProviderCheckoutWizardStep01Component} from "./wizard/step01/step01.component";
import {PluginProviderCheckoutWizardStep02Component} from "./wizard/step02/step02.component";
import {PluginProviderCheckoutWizardStep03Component} from "./wizard/step03/step03.component";
import {NbCardModule } from "@nebular/theme";
import {FormsModule} from "@angular/forms";



const COMPONENTS = [
  PluginProviderCheckoutComponent,
  PluginProviderCheckoutPlansComponent,
  PluginProviderCheckoutSummaryComponent,
  PluginProviderCheckoutPlanInternetComponent,
  PluginProviderCheckoutPlanInternetOptionalComponent,
  PluginProviderCheckoutPlanTelevisionComponent,
  PluginProviderCheckoutPlanTelevisionOptionalComponent,
  PluginProviderCheckoutPlanTelephoneComponent,
  PluginProviderCheckoutWizardComponent,
  PluginProviderCheckoutWizardStep01Component,
  PluginProviderCheckoutWizardStep02Component,
  PluginProviderCheckoutWizardStep03Component
];

@NgModule({
  imports: [
    //BrowserModule,
    CommonModule,
    NbCardModule,
    FormsModule
  ],
  exports: [
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class PluginProviderCheckoutModule {
}




