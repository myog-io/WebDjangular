import { Component, OnInit } from '@angular/core';


import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-code',
  styleUrls: ['code.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" >
    <label>{{ config.label }}</label>
    <ngx-monaco-editor [options]="editorOptions" [formControlName]="config.name" ></ngx-monaco-editor>
    <wda-form-validators [config]="config" [input]="group.get(this.config.name)"></wda-form-validators>
  </div><!--form-group-->
`
})
export class BuilderFormCodeComponent implements BuilderFormField, OnInit {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  editorOptions = { theme: 'vs-dark', language: 'html' };

  ngOnInit(){
    if (this.config.options){
      this.editorOptions = Object.assign(
        this.editorOptions,
        this.config.options
      );
    }
  }
}
