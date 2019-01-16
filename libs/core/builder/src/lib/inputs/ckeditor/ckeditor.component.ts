import { Component } from '@angular/core';
import './ckeditor.loader';
import 'ckeditor';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-ckeditor',
  styleUrls: ['ckeditor.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" >
    <label>{{ config.label }}</label>
    <ckeditor [config]="{ extraPlugins: 'divarea', height: '320' }" [formControlName]="config.name"></ckeditor>
    <wda-form-validators [config]="config" [input]="group.get(this.config.name)"></wda-form-validators>
  </div><!--form-group-->
`
})
export class BuilderFormCkeditorComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
