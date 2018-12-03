import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { JsonLogic } from '../builder-jsonlogic';
import { Observable } from 'rxjs';

export interface BuilderFormConfig{
  submit_label?: string;
  submit_size?: string;
  submit_status?: string;
  loading?: boolean;
  fields: BuilderFormFieldConfig[];
}

export interface BuilderFormFieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  form_group_name?: string;
  options?: any[];
  options_model?: any, // From AbstractModel
  multiple?: boolean;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  wrapper_class?: string;
  inputType?: string;
  conditional?: any;
  display?: boolean;
}

export interface BuilderFormField {
  config: BuilderFormFieldConfig;
  group: FormGroup;
  relationshipUpdated?: EventEmitter<any>;

}
