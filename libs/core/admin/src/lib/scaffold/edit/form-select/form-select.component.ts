import { Component } from '@angular/core';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';



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
  group: AbstractForm;
}
