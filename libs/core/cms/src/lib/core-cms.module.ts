import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCmsGalleryComponent } from './components/gallery/gallery.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { CoreCmsMapsComponent } from './components/maps/maps.component';
import { CoreCmsLinkComponent } from './components/link.component';
import { RouterModule } from '@angular/router';
import { CoreCmsFormComponent } from './components/form/form.component';
import { BuilderFormModule } from '@core/builder/src/lib/builder-form.module';


const MODULES = [
  CommonModule,
  NgbCarouselModule,
  AgmCoreModule,
  RouterModule,
  BuilderFormModule
];


const COMPONENTS = [
  CoreCmsGalleryComponent,
  CoreCmsMapsComponent,
  CoreCmsLinkComponent,
  CoreCmsFormComponent,
];


@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS
  ],
  
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
})
export class CoreCmsModule { }
