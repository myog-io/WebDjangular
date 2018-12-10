import { Component, OnInit } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-select',
  styleUrls: ['select.component.scss'],
  template: `
    <div class="form-group form-select" [formGroup]="group" >
      <label>{{ config.label }}</label>
      <ng-select class="form-control" (change)="onChange" [formControlName]="config.name" [multiple]="config.multiple" [loading]="loading">
        <ng-option value="null">{{ config.placeholder }}</ng-option>
        <ng-option *ngFor="let option of options" value="{{option.value}}">
          {{option.label}}
        </ng-option>
      </ng-select>
    </div><!--form-group-->
  `
})
export class BuilderFormSelectComponent implements BuilderFormField, OnInit {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  loading: boolean = false;
  options = []
  /**
   * Creates an instance of scaffold form select component.
   * @param datastore
   */
  constructor(private datastore: WebAngularDataStore) {

  }
  /**
   * on init
   */
  ngOnInit() {
    if (this.config.options_model) {
      this.datastore.findAll(this.config.options_model).subscribe(data => {
        const models = data.getModels();
        this.config.options = [];
        for (let i = 0; i < models.length; i++) {
          const entry = models[i];

          this.options.push({
            value: entry.id,
            label: entry.toString()
          });
        }
      });
    }else{
      this.options = this.config.options;
    }
    if (this.config.value) {
      this.group.get(this.config.name).setValue(this.config.value);
    }
  }
}
