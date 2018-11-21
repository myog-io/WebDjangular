import { Component } from '@angular/core';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';


@Component({
  selector: 'wda-form-button',
  styleUrls: ['form-button.component.scss'],
  template: `

    <div
      class="dynamic-field form-button"
      [formGroup]="group"  *ngIf="ng_if()">
      <button type="submit" class="btn btn-hero-primary" [disabled]="config.disabled">{{ config.label }}</button>
    </div>
  `
})
export class ScaffoldFormButtonComponent extends ScaffoldField {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
}
