import { NgModule } from '@angular/core';
import { MenuBuilderComponent } from './menu_builder.component';
import { NbAccordionModule } from '@nebular/theme';
import { MenuBuilderRoutingModule } from './menu_builder-routing.module';
import { ThemeModule } from '@core/admin/src/lib/@theme';
import { BuilderFormModule } from '@core/builder/src/lib/builder-form.module';
import { NestableModule } from 'ngx-nestable';

@NgModule({
  imports: [
    ThemeModule,
    MenuBuilderRoutingModule,
    NbAccordionModule,
    BuilderFormModule,
    NestableModule
  ],
  declarations: [MenuBuilderComponent]
})
export class MenuBuilderModule {}
