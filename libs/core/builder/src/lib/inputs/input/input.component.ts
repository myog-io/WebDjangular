import { Component } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-input',
  styleUrls: ['input.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" *ngIf="ng_if()">
    <label>{{ config.label }}</label>
    <input
    [type]="config.inputType ? config.inputType : text"
    class="form-control"
    [attr.placeholder]="config.placeholder"
    [formControlName]="config.name">
  </div><!--form-group-->
`
})
export class BuilderFormInputComponent extends BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
