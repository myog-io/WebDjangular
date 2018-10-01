import { Component, ViewContainerRef } from '@angular/core';

import { ScaffoldField } from '../../../../@core/interfaces/scaffold-field.interface';
import { ScaffoldFieldConfig } from '../../../../@core/interfaces/scaffold-field-config.interface';

import { AbstractForm } from '../../../../@core/data/forms/Abstract.form';

import './form-ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'wda-form-ckeditor',
  styleUrls: ['form-ckeditor.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group">
    <label>{{ config.label }}</label>
    <ckeditor [config]="{ extraPlugins: 'divarea', height: '320' }" [formControlName]="config.name"></ckeditor>
  </div><!--form-group-->
`
})
export class ScaffoldCkeditorInputComponent implements ScaffoldField {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
}
