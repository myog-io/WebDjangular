import { Component } from '@angular/core';
import './ckeditor.loader';
import 'ckeditor';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig, BuilderFormField } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-ckeditor',
  styleUrls: ['ckeditor.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" *ngIf="ng_if()">
    <label>{{ config.label }}</label>
    <ckeditor [config]="{ extraPlugins: 'divarea', height: '320' }" [formControlName]="config.name"></ckeditor>
  </div><!--form-group-->
`
})
export class BuilderFormCkeditorComponent extends BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
