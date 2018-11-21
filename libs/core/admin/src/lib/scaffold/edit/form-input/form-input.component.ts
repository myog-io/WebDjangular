import { Component } from '@angular/core';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';


@Component({
  selector: 'wda-form-input',
  styleUrls: ['form-input.component.scss'],
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
export class ScaffoldFormInputComponent extends ScaffoldField {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
}
