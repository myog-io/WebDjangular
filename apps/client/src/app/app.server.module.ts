import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule, HTTP_BASE_URL } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';


declare var global;

export function getBaseHttpUrl() {
  return (global as any)['HTTP_BASE_URL'];
}
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_BASE_URL, useFactory: getBaseHttpUrl},
  ],
})
export class AppServerModule {}
