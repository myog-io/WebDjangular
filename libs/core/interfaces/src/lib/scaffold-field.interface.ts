import { FormGroup } from '@angular/forms';
import { ScaffoldFieldConfig } from './scaffold-field-config.interface';

export class ScaffoldField {
  config: ScaffoldFieldConfig;
  group: FormGroup;

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
            break;
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
