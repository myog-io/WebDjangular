import { Component } from '@angular/core';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';


@Component({
  selector: 'wda-form-code',
  styleUrls: ['form-code.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" *ngIf="ng_if()">
    <label>{{ config.label }}</label>
    <ngx-monaco-editor [options]="editorOptions" [formControlName]="config.name" ></ngx-monaco-editor>
  </div><!--form-group-->
`
})
export class ScaffoldFormCodeComponent extends ScaffoldField {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
  editorOptions = {theme: 'vs-dark', language: 'html'};
}
