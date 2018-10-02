import { FormGroup } from '@angular/forms';
import { ScaffoldFieldConfig } from './scaffold-field-config.interface';

export interface ScaffoldField {
  config: ScaffoldFieldConfig;
  group: FormGroup;
}
