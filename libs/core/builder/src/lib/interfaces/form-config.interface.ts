import { FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

export interface BuilderFormDisplayGroups {
  wrapper_class: string,
  groups: BuilderFormGroupConfig[],
  conditional?: any,
  sort?: number,
}

export interface BuilderFormConfig {
  submit_label?: string;
  submit_size?: string;
  submit_status?: string;
  submit_continue_label?: string;
  submit_continue_size?: string;
  submit_continue_status?: string;
  loading?: boolean;
  displayGroups: BuilderFormDisplayGroups[];
}

export interface BuilderFormGroupConfig {
  name: string;
  title: string;
  wrapper_class?: string;
  type?: string;
  sidebar?: boolean;
  display?: boolean;
  conditional?: any;
  fields?: BuilderFormFieldConfig[];
}
export interface BuilderFormFieldConfig {
  type: string;
  validators?: Validators[];
  disabled?: boolean;
  label?: string;
  name?: string; // Maybe we wont use it
  form_group_name?: string;
  model?: any;//AbstractModel;
  options?: any[];
  options_model?: any; // From AbstractModel
  multiple?: boolean;
  placeholder?: string;
  validation?: ValidatorFn[];
  value?: any;
  wrapper_class?: string;
  inputType?: string;
  conditional?: any;
  display?: boolean;
  switch_vertical?: boolean;
  switch_first_label?: string;
  switch_second_label?: string;
  switch_first_value?: any;
  switch_second_value?: any;
  fields?: BuilderFormFieldConfig[]; // Children of this Form
  smart_table_mode?: 'external' | 'inline';
  backendResourceName?: string;
  formType?: any;
  sort?: number;
  displayGroup?: string;
}

export interface BuilderFormField {
  config: BuilderFormFieldConfig;
  group: FormGroup;
  relationshipUpdated?: EventEmitter<any>;

}
