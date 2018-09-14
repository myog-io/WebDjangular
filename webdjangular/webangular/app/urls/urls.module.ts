import { NgModule } from '@angular/core';

import { UrlsComponent } from './urls.component';
import { UrlsRoutingModule } from './urls-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const URLS_COMPONENTS = [
  UrlsComponent,
];

@NgModule({
  imports: [
    UrlsRoutingModule,
    ThemeModule,
   
  ],
  declarations: [
    ...URLS_COMPONENTS,
  ],
  exports:[
    UrlsRoutingModule
  ]
})
export class UrlsModule {
	
}

