import { Component, OnInit } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

import { WebAngularDataStore } from '@webdjangular/core/services';
import { ModelPaginatorControls } from '../../model-paginator/model-paginator.controls';

@Component({
  selector: 'wda-form-checkbox',
  styleUrls: ['checkbox.component.scss'],
  template: `
  <div class="form-group" [formGroup]="group" >
    <label>{{ config.label }}</label>

    <wda-model-paginator [options]="paginatorConfig" (controls)="modelPaginatorControlsGetter($event)">
      <div class="row" *ngIf="paginatorControls">
        <div class="col-4" *ngFor="let entry of paginatorControls.getEntries(); let i=index;">
          <nb-checkbox status="success"
          class="col-sm-4" [value]="group.doesEntityHasRelationship(config.name, entry)"
          (change)="group.checkboxRelationListener($event, config.name, entry)">
            {{ entry.toString() }}
          </nb-checkbox>
        </div>
      </div>
    </wda-model-paginator>

  </div><!--form-group-->
`
})
export class BuilderFormCheckboxOptionsComponent implements BuilderFormField, OnInit {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  public paginatorControls: ModelPaginatorControls;

  public paginatorConfig: any ={
    pageSize: 12,
    modelToPaginate: null,
    useDatastore: null,
  }

  constructor(private datastore: WebAngularDataStore,) {

  }

  ngOnInit(): void {
    console.log("config.options_model",this.config.options_model);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.config.options_model){
      this.paginatorConfig.modelToPaginate = this.config.options_model;
      this.paginatorConfig.useDatastore = this.datastore;
    }
  }

  /**
   * Models paginator controls getter
   * @param $event
   */
  modelPaginatorControlsGetter($event) {
    console.log($event);
    this.paginatorControls = $event;
  }
}
