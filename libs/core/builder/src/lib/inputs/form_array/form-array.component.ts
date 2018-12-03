import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-array',
  styleUrls: ['form-array.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" >
    <label>{{ config.label }}</label>
    <div class="row">

    </div>
  </div><!--form-group-->
`
})
export class BuilderFormArrayComponent implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;

  ngOnInit(){

  }

  ngOnDestroy(){

  }


}
