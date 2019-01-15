import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NxModule} from '@nrwl/nx';
import {RouterModule} from '@angular/router';
import {JsonApiModule} from 'angular2-jsonapi';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreServicesModule, WDAConfig} from '@webdjangular/core/services';
import {APP_BASE_HREF} from '@angular/common';
import {AppHttpInterceptor} from '@webdjangular/core/interceptors';
import {CookieService} from 'ngx-cookie-service';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {AgmCoreModule, LAZY_MAPS_API_CONFIG} from '@agm/core';
import {GoogleMapsLazyConfig} from '@webdjangular/core/cms';

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
          loadChildren: "@webdjangular/themes/providerfy#ThemeProviderfyModule"
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
