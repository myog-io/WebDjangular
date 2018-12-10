import { APP_BASE_HREF } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreAdminModule } from "@webdjangular/core/admin";
import { WDAConfig, CoreServicesModule } from "@webdjangular/core/services";
import { AppHttpInterceptor } from "@webdjangular/core/interceptors";
import { ThemeModule } from "@webdjangular/core/admin-theme";
import { NbToastrModule, NbGlobalPhysicalPosition } from "@nebular/theme";
import { CookieService } from "ngx-cookie-service";



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
    //CoreServicesModule.forRoot(), // Not Sure if we should do here or note
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreAdminModule.forRoot(),
    NbToastrModule.forRoot({
      destroyByClick: true,
      duration: 3000,
      preventDuplicates: false,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,

    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    WDAConfig,
    CookieService,
    { provide: APP_BASE_HREF, useValue: "/" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {provide: APP_INITIALIZER, useFactory:wda_init, deps:[WDAConfig], multi:true }
  ]
})
export class AppModule { }
