import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ScaffoldRoutingModule } from './scaffold-routing.module';
import { ScaffoldComponent } from './scaffold.component';
import { ScaffoldEditComponent } from './edit/scaffold-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { FormioModule, FormioAppConfig, FormioLoader, FormioService } from "angular-formio";

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
  ],
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [
  ],
  providers: [
    {provide: FormioService, useValue:{
      url:'http://localhost:4201'
    }},
    FormioLoader,
    {provide: FormioAppConfig, useValue:
    {
      appUrl: 'http://localhost:4201',
      apiUrl: 'http://localhost:4201/api'
    }},
  ]
})
export class ScaffoldModule {

}

