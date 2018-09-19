import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScaffoldField } from '../../../../@core/interfaces/scaffold-field.interface';
import { ScaffoldFieldConfig } from '../../../../@core/interfaces/scaffold-field-config.interface';

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
export class ScaffoldCkedtiorInputComponent implements ScaffoldField {
  config: ScaffoldFieldConfig;
  group: FormGroup;
}
