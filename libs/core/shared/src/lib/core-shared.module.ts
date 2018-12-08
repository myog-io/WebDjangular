import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



const ENTRY_COMPONENTS = [

]
@NgModule({
  declarations: [ ...ENTRY_COMPONENTS ],
  imports: [
    CommonModule,
  ],
  exports: [],
  entryComponents: [ ...ENTRY_COMPONENTS ],
  providers: [

  ]
})
export class CoreSharedModule {}
