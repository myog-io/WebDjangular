import { Component } from '@angular/core';
import './form-ckeditor.loader';
import 'ckeditor';
import { ScaffoldFieldConfig, ScaffoldField } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';

@Component({
  selector: 'wda-form-ckeditor',
  styleUrls: ['form-ckeditor.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" *ngIf="ng_if()">
    <label>{{ config.label }}</label>
    <ckeditor [config]="{ extraPlugins: 'divarea', height: '320' }" [formControlName]="config.name"></ckeditor>
  </div><!--form-group-->
`
})
export class ScaffoldCkeditorInputComponent extends ScaffoldField {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
}
