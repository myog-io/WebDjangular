import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBuilderModule } from './menu-builder/menu_builder.module';

@NgModule({
  imports: [CommonModule, MenuBuilderModule]
})

export class CoreCmsModule {}
