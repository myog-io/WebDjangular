import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBuilderModule } from './menu-builder/menu_builder.module';
import { CoreCmsGalleryComponent } from './components/gallery/gallery.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

const MODULES = [
  CommonModule,
  MenuBuilderModule,
  NgbCarouselModule
];


const COMPONENTS = [
  CoreCmsGalleryComponent
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
