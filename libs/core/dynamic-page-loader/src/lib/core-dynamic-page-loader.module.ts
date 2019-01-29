
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreDynamicPageLoaderComponent } from './core-dynamic-page-loader.component';
import { ContentViewer, EmbeddedComponents } from './core-dynamic-content-viewer';
import { PluginProviderModule } from '@plugins/provider/src/lib/provider.module';
import { CoreCmsModule } from '@core/cms/src/lib/core-cms.module';
import { PluginProviderCheckoutModule } from '@plugins/provider/src/lib/components/checkout/checkout.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

const DECLARATIONS = [
  ContentViewer,
  CoreDynamicPageLoaderComponent

]
//  TODO: DYNAMIC??
const IMPORTS_FOR_DYNAMIC = [
  PluginProviderModule,
  CoreCmsModule,
  PluginProviderCheckoutModule,
]

@NgModule({
  imports: [
    CommonModule,
    ...IMPORTS_FOR_DYNAMIC,
    RouterModule,
    
  ],
  declarations: [
    ...DECLARATIONS
  ],
  entryComponents: [
    ...DECLARATIONS
  ],
  exports: [
    ...DECLARATIONS
  ],
  bootstrap: [CoreDynamicPageLoaderComponent],
  providers: [EmbeddedComponents]
})
export class CoreDynamicPageLoaderModule { }
