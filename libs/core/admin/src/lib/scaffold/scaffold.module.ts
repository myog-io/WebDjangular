import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ScaffoldRoutingModule } from './scaffold-routing.module';
import { ScaffoldComponent } from './scaffold.component';
import { ScaffoldEditComponent } from './edit/scaffold-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { FormioModule } from "angular-formio";
import { ScaffoldFieldModule } from './scaffold-field.module';
import { FormioService } from "angular-formio";

const COMPONENTS = [
    ScaffoldComponent,
    ScaffoldEditComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ScaffoldRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule,
    FormioModule,
    ScaffoldFieldModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [
  ],
  providers: [

  ]
})
export class ScaffoldModule {

}

