import "reflect-metadata";
import {NgModule} from '@angular/core';
//import {BrowserModule} from "@angular/platform-browser";
import {PluginProviderCheckoutComponent} from "./checkout.component";

import {PluginProviderCheckoutPlansComponent} from "./plans/plans.component";
import {PluginProviderCheckoutSummaryComponent} from "./summary/summary.component";
import {PluginProviderCheckoutPlanInternetComponent} from "./plans/internet/internet.component";
import {PluginProviderCheckoutPlanInternetOptionalComponent} from "./plans/internet/optional/optional.component";
import {PluginProviderCheckoutPlanTelephoneComponent} from "./plans/telephone/telephone.component";
import {PluginProviderCheckoutPlanTelevisionComponent} from "./plans/television/television.component";
import {PluginProviderCheckoutPlanTelevisionOptionalComponent} from "./plans/television/optional/optional.component";



const COMPONENTS = [
    PluginProviderCheckoutComponent,
    PluginProviderCheckoutPlansComponent,
    PluginProviderCheckoutSummaryComponent,
    PluginProviderCheckoutPlanInternetComponent,
    PluginProviderCheckoutPlanInternetOptionalComponent,
    PluginProviderCheckoutPlanTelevisionComponent,
    PluginProviderCheckoutPlanTelevisionOptionalComponent,
    PluginProviderCheckoutPlanTelephoneComponent,
];

@NgModule({
    imports: [
        //BrowserModule
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




