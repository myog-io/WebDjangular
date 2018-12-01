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
import { NgSelectModule } from '@ng-select/ng-select';
import { ScaffoldFormRelationshipComponent } from './edit/form-relationship/form-relationship.component';
import { NbDialogModule, NbWindowModule, NbSpinnerModule, NbButtonModule, NbListModule } from '@nebular/theme';
import {ScaffoldFormFormbuilderComponent} from "./edit/form-formbuilder/form-formbuilder.component";
import { FormioModule } from 'angular-formio';

const ENTRY_COMPONENTS = [
  ScaffoldFormRelationshipComponent,
  ScaffoldFormButtonComponent,
  ScaffoldFormInputComponent,
  ScaffoldFormSelectComponent,
  ScaffoldCkeditorInputComponent,
  ScaffoldFormCodeComponent,
  ScaffoldFormFormbuilderComponent
];

@NgModule({
  declarations: [ScaffoldFieldDirective, ... ENTRY_COMPONENTS],
  imports: [
    CommonModule,
    CKEditorModule,
    FormioModule,
    MonacoEditorModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbButtonModule,
    NbSpinnerModule,
    NbListModule
  ],
  exports: [ScaffoldFieldDirective],
  entryComponents: [
    ... ENTRY_COMPONENTS
  ]
})
export class ScaffoldFieldModule {}