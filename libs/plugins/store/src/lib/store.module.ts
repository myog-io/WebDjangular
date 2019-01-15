import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';



const MODULES = [
  CommonModule,

];

const COMPONENTS = [


];


@NgModule({
  imports: [...MODULES],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  declarations: [...COMPONENTS]
})
export class PluginStoreModule {
}
