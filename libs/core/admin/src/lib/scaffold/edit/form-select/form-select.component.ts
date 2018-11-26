import { Component, OnInit } from '@angular/core';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';



@Component({
  selector: 'wda-form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div class="form-group form-select" [formGroup]="group" *ngIf="ng_if()">
      <label>{{ config.label }}</label>
      <select class="form-control" [formControlName]="config.name">
        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options" value="{{option.value}}">
          {{ option.label }}
        </option>
      </select>
    </div><!--form-group-->
  `
})
export class ScaffoldFormSelectComponent extends ScaffoldField {
  config: ScaffoldFieldConfig;
  group: AbstractForm;

}
