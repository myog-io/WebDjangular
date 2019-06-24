import 'reflect-metadata';
import { NgModule } from '@angular/core';
//import {BrowserModule} from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { PluginProviderCheckoutComponent } from './checkout.component';

import { MediaService } from '@core/media/src/lib/core-media.service';

import { PluginProviderCheckoutPlansComponent } from './plans/plans.component';
import { PluginProviderCheckoutSummaryComponent } from './summary/summary.component';
import { PluginProviderCheckoutPlanInternetComponent } from './plans/internet/internet.component';
import { PluginProviderCheckoutPlanInternetOptionalComponent } from './plans/internet/optional/optional.component';
import { PluginProviderCheckoutPlanTelephoneComponent } from './plans/telephone/telephone.component';
import { PluginProviderCheckoutPlanTelevisionComponent } from './plans/television/television.component';
import { PluginProviderCheckoutPlanTelevisionOptionalComponent } from './plans/television/optional/optional.component';
import { PluginProviderCheckoutWizardComponent } from './wizard/wizard.component';
import { PluginProviderCheckoutWizardStep01Component } from './wizard/step01/step01.component';
import { PluginProviderCheckoutWizardStep02Component } from './wizard/step02/step02.component';
import { PluginProviderCheckoutWizardStep03Component } from './wizard/step03/step03.component';
import { WdaUploaderComponent } from '@core/media/src/lib/wda-uploader/wda-uploader.component';

import {
  NbCardModule,
  NbTooltipDirective,
  NbTooltipModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PluginProviderCheckoutPlanTelephoneOptionalComponent } from './plans/telephone/optional/optional.component';
import { PluginProviderCheckoutBeforeCheckoutComponent } from './before-checkout/before-checkout.component';
import { NgxMaskModule } from 'ngx-mask';
import { PluginProviderCheckoutErrorComponent } from './checkout-form-error.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



const COMPONENTS = [
  PluginProviderCheckoutComponent,
  PluginProviderCheckoutPlansComponent,
  PluginProviderCheckoutSummaryComponent,
  PluginProviderCheckoutPlanInternetComponent,
  PluginProviderCheckoutPlanInternetOptionalComponent,
  PluginProviderCheckoutPlanTelevisionComponent,
  PluginProviderCheckoutPlanTelevisionOptionalComponent,
  PluginProviderCheckoutPlanTelephoneComponent,
  PluginProviderCheckoutPlanTelephoneOptionalComponent,
  PluginProviderCheckoutBeforeCheckoutComponent,
  PluginProviderCheckoutWizardComponent,
  PluginProviderCheckoutWizardStep01Component,
  PluginProviderCheckoutWizardStep02Component,
  PluginProviderCheckoutWizardStep03Component,
  PluginProviderCheckoutErrorComponent,
  WdaUploaderComponent
];

@NgModule({
  imports: [
    //BrowserModule,
    CommonModule,
    RouterModule,
    NbCardModule,
    NbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgbModalModule
  ],
  providers: [MediaService],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS]
})
export class PluginProviderCheckoutModule { }
