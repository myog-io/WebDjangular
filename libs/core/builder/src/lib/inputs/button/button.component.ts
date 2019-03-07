import { Component } from '@angular/core';
import { BuilderFormFieldConfig, BuilderFormField } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-button',
  styleUrls: ['button.component.scss'],
  template: `
    <div class="dynamic-field form-button"
         [formGroup]="group" >
      <button type="submit" class="btn" [ngClass]="config.element_class" 
              [disabled]="config.disabled">
        {{ config.label }}
      </button>
    </div>
  `
})
export class BuilderFormButtonComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
