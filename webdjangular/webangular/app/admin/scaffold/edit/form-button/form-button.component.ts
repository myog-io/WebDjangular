import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScaffoldField } from '../../../../@core/interfaces/scaffold-field.interface';
import { ScaffoldFieldConfig } from '../../../../@core/interfaces/scaffold-field-config.interface';


@Component({
  selector: 'wda-form-button',
  styleUrls: ['form-button.component.scss'],
  template: `
    <div 
      class="dynamic-field form-button"
      [formGroup]="group">
      <button type="submit" class="btn btn-hero-primary" [disabled]="config.disabled">{{ config.label }}</button>
    </div>
  `
})
export class ScaffoldFormButtonComponent implements ScaffoldField {
  config: ScaffoldFieldConfig;
  group: FormGroup;
}
