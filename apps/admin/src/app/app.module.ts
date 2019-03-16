import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NbToastrModule, NbGlobalPhysicalPosition } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';
import { ThemeModule } from '@core/admin/src/lib/@theme';
import { CoreAdminModule } from '@core/admin/src/lib/core-admin.module';
import { AppHttpInterceptor } from '@core/interceptors/src/lib/apphttp.interceptor';
import { CoreAuthModule } from '@core/auth/src/lib/core-auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreAuthModule,
    AppRoutingModule,
    //CoreServicesModule.forRoot(), // Not Sure if we should do here or note
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreAdminModule.forRoot(),
    NbToastrModule.forRoot({
      destroyByClick: true,
      duration: 3000,
      preventDuplicates: false,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
