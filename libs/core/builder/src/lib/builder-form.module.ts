import { NgModule } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { ScaffoldFieldDirective } from './builder-form.directive';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  NbDialogModule,
  NbWindowModule,
  NbSpinnerModule,
  NbButtonModule,
  NbListModule,
  NbCheckboxModule,
  NbCardModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbSelectModule,
  NbAlertModule
} from '@nebular/theme';

import { BuilderFormButtonComponent } from './inputs/button/button.component';
import { BuilderFormInputComponent } from './inputs/input/input.component';
import { BuilderFormSelectComponent } from './inputs/select/select.component';
import { BuilderFormNgSelectComponent } from './inputs/ngselect/ngselect.component';
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
import { BuilderFormDatepickerComponent } from './inputs/datepicker/datepicker.component';
import { BuilderFormJsonLogicComponent } from './inputs/json_logic/json_logic.component';
import { HoldableDirective } from './holdable/holdable.directive';
import { BuilderFormTextAreaComponent } from './inputs/textarea/textarea.component';

const ENTRY_COMPONENTS = [
  BuilderFormButtonComponent,
  BuilderFormInputComponent,
  BuilderFormTextAreaComponent,
  BuilderFormSelectComponent,
  BuilderFormNgSelectComponent,
  BuilderFormCodeComponent,
  BuilderFormBuilderComponent,
  BuilderFormArrayComponent,
  BuilderFormSwitcherComponent,
  BuilderFormGroupComponent,
  BuilderFormCheckboxOptionsComponent,
  BuilderFormDatepickerComponent,
  BuilderFormJsonLogicComponent,
  ModelPaginatorComponent,
  BuilderFormValidatorComponent
];

@NgModule({
  declarations: [
    ScaffoldFieldDirective,
    HoldableDirective,
    BuilderFormComponent,
    ...ENTRY_COMPONENTS
  ],
  imports: [
    CommonModule,
    MonacoEditorModule.forRoot({ baseUrl: './assets' }),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbButtonModule,
    NbSpinnerModule,
    NbAlertModule,
    NbListModule,
    NbCheckboxModule,
    NbCardModule,
    NbAccordionModule
  ],
  exports: [
    ScaffoldFieldDirective,
    HoldableDirective,
    BuilderFormComponent,
    ModelPaginatorComponent
  ],
  entryComponents: [...ENTRY_COMPONENTS]
})
export class BuilderFormModule {}
