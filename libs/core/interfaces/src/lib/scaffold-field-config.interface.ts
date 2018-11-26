import { ValidatorFn } from '@angular/forms';

export interface ScaffoldFieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: string[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  wrapper_class?: string;
  inputType?: string;
  ng_if?: any;
}
