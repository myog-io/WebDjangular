import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ScaffoldField } from '../../../../@core/interfaces/scaffold-field.interface';
import { ScaffoldFieldConfig } from '../../../../@core/interfaces/scaffold-field-config.interface';

@Component({
  selector: 'wda-form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div class="form-group form-select" [formGroup]="group">
      <label>{{ config.label }}</label>
      <select class="form-control" [formControlName]="config.name">
        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options">
          {{ option }}
        </option>
      </select>
    </div><!--form-group-->


  `
})
export class ScaffoldFormSelectComponent implements ScaffoldField {
  config: ScaffoldFieldConfig;
  group: FormGroup;
}
