import { Component, OnInit } from '@angular/core';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { WebAngularDataStore } from '@webdjangular/core/services';



@Component({
  selector: 'wda-form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div class="form-group form-select" [formGroup]="group" *ngIf="ng_if()">
      <label>{{ config.label }}</label>
      <ng-select class="form-control" (change)="onChange" [formControlName]="config.name" [multiple]="config.multiple" [loading]="loading">
        <ng-option value="">{{ config.placeholder }}</ng-option>
        <ng-option *ngFor="let option of config.options" value="{{option.value}}">
          {{option.label}}
        </ng-option>
      </ng-select>
    </div><!--form-group-->
  `
})
export class ScaffoldFormSelectComponent extends ScaffoldField implements OnInit {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
  loading: boolean = false;

  /**
   * Creates an instance of scaffold form select component.
   * @param datastore
   */
  constructor(
    private datastore: WebAngularDataStore,
  ) {
    super();
  }

  /**
   * on init
   */
  ngOnInit() {
    if (this.config.options_model) {
      this.datastore.findAll(this.config.options_model).subscribe(
        (data) => {
          const models = data.getModels();
          this.config.options = [];
          for (let i = 0; i < models.length; i++) {
            const entry = models[i];
            this.config.options.push(
              { value: entry.id, label: entry.toString() }
            )
          }
        }
      )
    }
  }
}
