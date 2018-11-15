import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { CoreConfigGroupComponent } from './core-config-group.component';
import { ScaffoldModule } from '../scaffold/scaffold.module';
import { CoreConfigRoutingModule } from './core-config-group-routing.module';

const COMPONENTS = [
    CoreConfigGroupComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    CoreConfigRoutingModule
    //ScaffoldModule,

  ],
  declarations: [
    ...COMPONENTS,
  ]
})
export class CoreConfigGroupModule {

}

