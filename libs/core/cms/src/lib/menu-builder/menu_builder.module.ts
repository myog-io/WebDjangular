import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ThemeModule } from '@webdjangular/core/admin-theme';
import { MenuBuilderComponent } from './menu_builder.component';

import { NbAccordionModule } from '@nebular/theme'

import { MenuBuilderRoutingModule } from './menu_builder-routing.module';
import { BuilderFormModule } from '../../../../../core/builder/src/lib/builder-form.module';

@NgModule({
  imports: [
    ThemeModule,
    MenuBuilderRoutingModule,
    DragDropModule,
    NbAccordionModule,
    BuilderFormModule
  ],
  declarations: [
    MenuBuilderComponent,
  ],
})
export class MenuBuilderModule { 

}
