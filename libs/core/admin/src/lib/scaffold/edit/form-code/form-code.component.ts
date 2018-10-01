import { Component } from '@angular/core';

import { ScaffoldField } from '../../../../@core/interfaces/scaffold-field.interface';
import { ScaffoldFieldConfig } from '../../../../@core/interfaces/scaffold-field-config.interface';

import { AbstractForm } from '../../../../@core/data/forms/Abstract.form';

@Component({
  selector: 'wda-form-code',
  styleUrls: ['form-code.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group">
    <label>{{ config.label }}</label>
    <ngx-monaco-editor [options]="editorOptions" [formControlName]="config.name" ></ngx-monaco-editor>
  </div><!--form-group-->
`
})
export class ScaffoldFormCodeComponent implements ScaffoldField {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
  editorOptions = {theme: 'vs-dark', language: 'html'};
}
