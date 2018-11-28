import { ValidatorFn } from '@angular/forms';

export interface ScaffoldFieldConfig {
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
  ng_if?: any;
}
