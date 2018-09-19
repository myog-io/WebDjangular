import { NgModule } from '@angular/core';
import { UrlsRoutingModule } from './urls-routing.module';
import { UrlsComponent } from './urls.component';

const COMPONENTS = [
  UrlsComponent,
];

@NgModule({
  imports: [
    UrlsRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,

  ],
  exports:[
    UrlsRoutingModule
  ]
})
export class UrlsModule {
    // This Module Take Care of getting the Information that will be printed in teh screen, and send to the correct plugins to render / Pages / Blog / Products ... ETC
	
}