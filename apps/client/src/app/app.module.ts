import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { JsonApiModule } from 'angular2-jsonapi';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDynamicPageLoaderModule } from '@webdjangular/core/dynamic-page-loader';
import { CoreServicesModule, WDAConfig } from '@webdjangular/core/services';
import { APP_BASE_HREF } from '@angular/common';
import { AppHttpInterceptor } from '@webdjangular/core/interceptors';

export function wda_init(wdaconfig: WDAConfig) {
  return () => wdaconfig.WDAInit();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JsonApiModule,
    NxModule.forRoot(),
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
        }
      ],
      { initialNavigation: 'enabled' }
    )
  ],
  bootstrap: [AppComponent],
  providers: [
    WDAConfig,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    { provide: APP_INITIALIZER, useFactory: wda_init, deps: [WDAConfig], multi: true }
  ],
})
export class AppModule { }
