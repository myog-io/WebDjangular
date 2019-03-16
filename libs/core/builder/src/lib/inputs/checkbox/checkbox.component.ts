import { Component, OnInit } from '@angular/core';
import { ModelPaginatorControls } from '../../model-paginator/model-paginator.controls';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

@Component({
  selector: 'wda-form-checkbox',
  styleUrls: ['checkbox.component.scss'],
  template: `
    <div class="form-group" [formGroup]="group">
      <label>{{ config.label }}</label>

      <wda-model-paginator
        [options]="paginatorConfig"
        (controls)="modelPaginatorControlsGetter($event)"
      >
        <div class="row" *ngIf="paginatorControls">
          <div
            class="col-4"
            *ngFor="let entry of paginatorControls.getEntries(); let i = index"
          >
            <nb-checkbox
              status="success"
              class="col-sm-4"
              [value]="group.doesEntityHasRelationship(config.name, entry)"
              (change)="
                group.checkboxRelationListener($event, config.name, entry)
              "
            >
              {{ entry.toString() }}
            </nb-checkbox>
          </div>
        </div>
      </wda-model-paginator>
    </div>
    tor>

  </div><
  `
})
export class BuilderFormCheckboxOptionsComponent
  implements BuilderFormField, OnInit {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  public paginatorControls: ModelPaginatorControls;

  public paginatorConfig: any = {
    pageSize: 12,
    modelToPaginate: null,
    useDatastore: null
  };

  constructor(private datastore: WebAngularDataStore) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.config.model) {
      this.paginatorConfig.modelToPaginate = this.config.model;
      this.paginatorConfig.useDatastore = this.datastore;
    }
    if (this.config.options) {
      this.paginatorConfig.options = this.config.options;
    }
  }

  /**
   * Models paginator controls getter
   * @param $event
   */
  modelPaginatorControlsGetter($event) {
    this.paginatorControls = $event;
  }
}
