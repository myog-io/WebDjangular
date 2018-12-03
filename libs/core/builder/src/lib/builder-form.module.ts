import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldFieldDirective } from './builder-form.directive';
import { CKEditorModule } from 'ng2-ckeditor';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  NbDialogModule,
  NbWindowModule,
  NbSpinnerModule,
  NbButtonModule,
  NbListModule
} from '@nebular/theme';

import { BuilderFormRelationshipComponent } from './inputs/relationship/relationship.component';
import { BuilderFormButtonComponent } from './inputs/button/button.component';
import { BuilderFormInputComponent } from './inputs/input/input.component';
import { BuilderFormSelectComponent } from './inputs/select/select.component';
import { BuilderFormCkeditorComponent } from './inputs/ckeditor/ckeditor.component';
import { BuilderFormCodeComponent } from './inputs/code/code.component';
import { BuilderFormBuilderComponent } from './inputs/formbuilder/formbuilder.component';

const ENTRY_COMPONENTS = [
  BuilderFormRelationshipComponent,
  BuilderFormButtonComponent,
  BuilderFormInputComponent,
  BuilderFormSelectComponent,
  BuilderFormCkeditorComponent,
  BuilderFormCodeComponent,
  BuilderFormBuilderComponent
];

@NgModule({
  declarations: [ScaffoldFieldDirective, ...ENTRY_COMPONENTS],
  imports: [
    CommonModule,
    CKEditorModule,
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
  entryComponents: [...ENTRY_COMPONENTS]
})
export class BuilderFormModule {}
