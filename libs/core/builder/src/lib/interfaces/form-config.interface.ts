import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

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
  ng_if?: any;
}

export class BuilderFormField {
  config: BuilderFormFieldConfig;
  group: FormGroup;
  relationshipUpdated: EventEmitter<any>;

  /**
   * ng_if
   */
  public ng_if() {
    if( this.config.ng_if ){
      for (let i = 0; i < this.config.ng_if.length; i++) {
        const ch = this.config.ng_if[i];
        const input_val = this.group.get(ch.input).value;
        const operator = ch.operator ? ch.operator : 'eq';
        switch (operator) {
          case 'eq':
            return input_val === ch.value;
            //break;
          case 'neq':
            return input_val !== ch.value;
          default:
            break;
        }
      }
    }
    return true;
  }
}
