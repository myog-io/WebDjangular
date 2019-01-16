import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NxModule} from '@nrwl/nx';
import {RouterModule} from '@angular/router';
import {JsonApiModule} from 'angular2-jsonapi';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {AgmCoreModule, LAZY_MAPS_API_CONFIG} from '@agm/core';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';
import { CoreServicesModule } from '@core/services/src/lib/core-services.module';
import { AppHttpInterceptor } from '@core/interceptors/src/lib/apphttp.interceptor';
import { GoogleMapsLazyConfig } from '@core/cms/src/lib/services/GoogleMapsLazyConfig';



export function wda_init(wdaconfig: WDAConfig) {
  return () => wdaconfig.WDAInit();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JsonApiModule,
    AgmCoreModule.forRoot(),
    NxModule.forRoot(),
    NgxPageScrollModule,
    CoreServicesModule.forRoot(),
    RouterModule.forRoot(
      [
        /*
        {
          path: '',
          loadChildren: () => CoreDynamicPageLoaderModule
        }*/
        {
          path: '',
          loadChildren: "@themes/providerfy/src/lib/providerfy.module#ThemeProviderfyModule"
        },
      ],
      {initialNavigation: 'enabled', anchorScrolling: 'enabled'}
    )
  ],
  bootstrap: [AppComponent],
  providers: [
    WDAConfig,
    CookieService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsLazyConfig},
    {provide: APP_INITIALIZER, useFactory: wda_init, deps: [WDAConfig], multi: true},


  ],
})
export class AppModule {
}
