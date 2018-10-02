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
  wrapperClass?: string;
  inputType?: string;
}
