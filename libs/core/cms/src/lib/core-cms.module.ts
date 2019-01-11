import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBuilderModule } from './menu-builder/menu_builder.module';
import { CoreCmsGalleryComponent } from './components/gallery/gallery.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { CoreCmsMapsComponent } from './components/maps/maps.component';

const MODULES = [
  CommonModule,
  MenuBuilderModule,
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
})
export class CoreCmsModule { }
