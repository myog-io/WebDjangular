import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScaffoldField } from '../../../../@core/interfaces/scaffold-field.interface';
import { ScaffoldFieldConfig } from '../../../../@core/interfaces/scaffold-field-config.interface';

@Component({
  selector: 'wda-form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group">
    <label>{{ config.label }}</label>
    <input 
    [type]="config.inputType ? config.inputType : text" 
    class="form-control" 
    [attr.placeholder]="config.placeholder"
    [formControlName]="config.name">
  </div><!--form-group-->
`
})
export class ScaffoldFormInputComponent implements ScaffoldField {
  config: ScaffoldFieldConfig;
  group: FormGroup;
}