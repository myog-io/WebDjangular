import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGalleryModule } from 'ngx-gallery';
import { CoreCmsGalleryComponent } from './components/gallery/gallery.component';


const MODULES = [
  CommonModule,
  NgxGalleryModule
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
