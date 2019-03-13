import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, InjectionToken } from '@angular/core';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { JsonApiModule } from 'angular2-jsonapi';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AgmCoreModule, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';
import { CoreServicesModule } from '@core/services/src/lib/core-services.module';
import { AppHttpInterceptor } from '@core/interceptors/src/lib/apphttp.interceptor';
import { GoogleMapsLazyConfig } from '@core/cms/src/lib/services/GoogleMapsLazyConfig';
import { ServerTransferStateModule } from '@angular/platform-server';
import { AppRoutingModule } from './app-routing.module';
import { CoreDynamicPageLoaderResolver } from "@core/dynamic-page-loader/src/lib/core-dynamic-page-loader.resolver";
import { EmbeddedComponents } from '@core/dynamic-page-loader/src/lib/core-dynamic-content-viewer';


export const HTTP_BASE_URL = new InjectionToken<string>('HTTP_BASE_URL');



declare var global;

export function getBaseHttpUrl() {
  return (global as any)['HTTP_BASE_URL'];
}

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}

export function wda_init(wdaconfig: WDAConfig) {
  return () => wdaconfig.WDAInit();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JsonApiModule,
    BrowserModule.withServerTransition({ appId: 'client' }),
    AgmCoreModule.forRoot(),
    NxModule.forRoot(),
    NgxPageScrollModule,
    CoreServicesModule.forRoot(),
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
  providers: [

    CookieService,
    CoreDynamicPageLoaderResolver,
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    WDAConfig,
    { provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsLazyConfig },
    { provide: APP_INITIALIZER, useFactory: wda_init, deps: [WDAConfig], multi: true },
    { provide: HTTP_BASE_URL, useFactory: getBaseHttpUrl },
  ],
})
export class AppModule {
}
