import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ScaffoldRoutingModule } from './scaffold-routing.module';
import { ScaffoldComponent } from './scaffold.component';
import { ScaffoldEditComponent } from './edit/scaffold-edit.component';
import { ScaffoldFormButtonComponent } from './edit/form-button/form-button.component';
import { ScaffoldFormInputComponent } from './edit/form-input/form-input.component';
import { ScaffoldFormSelectComponent } from './edit/form-select/form-select.component';
import { ScaffoldFieldDirective } from './edit/scaffold-field.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScaffoldCkeditorInputComponent } from './edit/form-ckeditor/form-ckeditor.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ScaffoldFormCodeComponent } from './edit/form-code/form-code.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

const ENTRY_COMPONENTS = [
  ScaffoldFormButtonComponent,
  ScaffoldFormInputComponent,
  ScaffoldFormSelectComponent,
  ScaffoldCkeditorInputComponent,
  ScaffoldFormCodeComponent
]

const COMPONENTS = [
    ScaffoldFieldDirective,
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
    CKEditorModule,
    MonacoEditorModule.forRoot()

  ],
  declarations: [
    ...COMPONENTS,
    ENTRY_COMPONENTS
  ],
  entryComponents: [
    ENTRY_COMPONENTS
  ]
})
export class ScaffoldModule {

}

