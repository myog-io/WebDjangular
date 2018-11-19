import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldFieldDirective } from './scaffold-field.directive';
import { ScaffoldFormButtonComponent } from './edit/form-button/form-button.component';
import { ScaffoldFormInputComponent } from './edit/form-input/form-input.component';
import { ScaffoldFormSelectComponent } from './edit/form-select/form-select.component';
import { ScaffoldCkeditorInputComponent } from './edit/form-ckeditor/form-ckeditor.component';
import { ScaffoldFormCodeComponent } from './edit/form-code/form-code.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule } from '@angular/forms';

const ENTRY_COMPONENTS = [
  ScaffoldFormButtonComponent,
  ScaffoldFormInputComponent,
  ScaffoldFormSelectComponent,
  ScaffoldCkeditorInputComponent,
  ScaffoldFormCodeComponent
]

@NgModule({
  declarations: [ScaffoldFieldDirective, ... ENTRY_COMPONENTS],
  imports: [
    CommonModule,
    CKEditorModule,
    MonacoEditorModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [ScaffoldFieldDirective],
  entryComponents: [
    ... ENTRY_COMPONENTS
  ]
})
export class ScaffoldFieldModule {}
