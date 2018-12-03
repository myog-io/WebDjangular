import { Component } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig, BuilderFormField } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-button',
  styleUrls: ['button.component.scss'],
  template: `

    <div
      class="dynamic-field form-button"
      [formGroup]="group"  *ngIf="ng_if()">
      <button type="submit" class="btn btn-hero-primary" [disabled]="config.disabled">{{ config.label }}</button>
    </div>
  `
})
export class BuilderFormButtonComponent extends BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
