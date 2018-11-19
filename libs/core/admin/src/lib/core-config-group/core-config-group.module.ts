import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { CoreConfigGroupComponent } from './core-config-group.component';
import { CoreConfigRoutingModule } from './core-config-group-routing.module';
import { ScaffoldFieldModule } from '../scaffold/scaffold-field.module';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
    CoreConfigGroupComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    CoreConfigRoutingModule,
    ScaffoldFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...COMPONENTS,
  ]
})
export class CoreConfigGroupModule {

}

