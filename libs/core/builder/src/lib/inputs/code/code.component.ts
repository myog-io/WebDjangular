import { Component } from '@angular/core';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-code',
  styleUrls: ['code.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" >
    <label>{{ config.label }}</label>
    <ngx-monaco-editor [options]="editorOptions" [formControlName]="config.name" ></ngx-monaco-editor>
    <wda-form-validators [config]="config" [input]="group.get(this.config.name)"></wda-form-validators>
  </div><!--form-group-->
`
})
export class BuilderFormCodeComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  editorOptions = { theme: 'vs-dark', language: 'html' };
}
