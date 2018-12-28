import { Component, OnInit } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-datepicker',
  styleUrls: ['datepicker.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" >
    <label>{{ config.label }}</label>
    <input class="form-control"
    inputType="date"
    [attr.placeholder]="config.placeholder"
    [formControlName]="config.name"
    [nbDatepicker]="picker"
    required="false"
    />

    <nb-datepicker #picker></nb-datepicker>
    <wda-form-validators [config]="config" [input]="group.get(this.config.name)"></wda-form-validators>

  </div><!--form-group-->
`
})
export class BuilderFormDatepickerComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  // TODO: Improve with Min max and other rules like formatting

}
