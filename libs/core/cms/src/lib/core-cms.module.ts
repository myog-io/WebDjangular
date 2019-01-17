import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCmsGalleryComponent } from './components/gallery/gallery.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { CoreCmsMapsComponent } from './components/maps/maps.component';

const MODULES = [
  CommonModule,
  NgbCarouselModule,
  AgmCoreModule,
];


const COMPONENTS = [
  CoreCmsGalleryComponent,
  CoreCmsMapsComponent
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
