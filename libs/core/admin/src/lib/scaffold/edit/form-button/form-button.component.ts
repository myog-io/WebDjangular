import { Component } from '@angular/core';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';


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
  group: AbstractForm;
}
