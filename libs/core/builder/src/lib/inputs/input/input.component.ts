import { Component } from '@angular/core';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-input',
  styleUrls: ['input.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" >
    <label>{{ config.label }}</label>
    <input
    [type]="config.inputType ? config.inputType : 'text'"
    class="form-control"
    [attr.placeholder]="config.placeholder"
    [formControlName]="config.name">
    <wda-form-validators [config]="config" [input]="group.get(this.config.name)"></wda-form-validators>
  </div><!--form-group-->
`
})
export class BuilderFormInputComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
