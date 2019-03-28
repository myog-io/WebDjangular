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
  templateUrl: 'checkbox.component.html'
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

  constructor(private datastore: WebAngularDataStore) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.config.model) {
      this.paginatorConfig.modelToPaginate = this.config.model;
      this.paginatorConfig.useDatastore = this.datastore;
    }
    console.log(this.group)
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
