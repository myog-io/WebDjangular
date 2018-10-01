/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreAdminModule} from '@webdjangular/core/admin';
import {ThemeModule} from '@webdjangular/core/admin-theme';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {JsonApiModule} from 'angular2-jsonapi';

import {AppHttpInterceptor} from '@webdjangular/core/interceptors';
import {WDAConfig, CoreServicesModule} from "@webdjangular/core/services";

export function wda_init(wdaconfig: WDAConfig) {
    return () => wdaconfig.WDAInit();
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        JsonApiModule,
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreAdminModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [
        WDAConfig,
        {provide: APP_BASE_HREF, useValue: '/'},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true
        },
        {provide: APP_INITIALIZER, useFactory:wda_init, deps:[WDAConfig], multi:true }
    ],
})
export class AppModule {
}
