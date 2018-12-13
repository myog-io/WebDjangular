import { NgModule } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
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
  NbListModule,
  NbCheckboxModule
} from '@nebular/theme';

import { BuilderFormRelationshipComponent } from './inputs/relationship/relationship.component';
import { BuilderFormButtonComponent } from './inputs/button/button.component';
import { BuilderFormInputComponent } from './inputs/input/input.component';
import { BuilderFormSelectComponent } from './inputs/select/select.component';
import { BuilderFormCkeditorComponent } from './inputs/ckeditor/ckeditor.component';
import { BuilderFormCodeComponent } from './inputs/code/code.component';
import { BuilderFormBuilderComponent } from './inputs/form_builder/form_builder.component';
import { BuilderFormArrayComponent } from './inputs/form_array/form-array.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BuilderFormComponent } from './builder-form.component';
import { BuilderFormSwitcherComponent } from './inputs/switch/switch.component';
import { BuilderFormGroupComponent } from './inputs/form_group/form_group.component';
import { BuilderFormCheckboxOptionsComponent } from './inputs/checkbox/checkbox.component';
import { ModelPaginatorComponent } from './model-paginator/model-paginator.component';
import { BuilderFormValidatorComponent } from './inputs/validators/validators.components';

const ENTRY_COMPONENTS = [
  BuilderFormRelationshipComponent,
  BuilderFormButtonComponent,
  BuilderFormInputComponent,
  BuilderFormSelectComponent,
  BuilderFormCkeditorComponent,
  BuilderFormCodeComponent,
  BuilderFormBuilderComponent,
  BuilderFormArrayComponent,
  BuilderFormSwitcherComponent,
  BuilderFormGroupComponent,
  BuilderFormCheckboxOptionsComponent,
  ModelPaginatorComponent,
  BuilderFormValidatorComponent
];

@NgModule({
  declarations: [ScaffoldFieldDirective, BuilderFormComponent, ...ENTRY_COMPONENTS],
  imports: [
    CommonModule,
    CKEditorModule,
    MonacoEditorModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbButtonModule,
    NbSpinnerModule,
    NbListModule,
    NbCheckboxModule,

  ],
  exports: [ScaffoldFieldDirective, BuilderFormComponent, ModelPaginatorComponent],
  entryComponents: [...ENTRY_COMPONENTS]
})
export class BuilderFormModule { }
