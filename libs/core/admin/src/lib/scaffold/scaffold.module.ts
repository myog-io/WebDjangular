import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ScaffoldRoutingModule } from './scaffold-routing.module';
import { ScaffoldComponent } from './scaffold.component';
import { ScaffoldEditComponent } from './edit/scaffold-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ThemeModule } from '../@theme/theme.module';
import { ScaffoldFieldModule } from './scaffold-field.module';


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
    ScaffoldFieldModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  entryComponents: [
  ]
})
export class ScaffoldModule {

}

