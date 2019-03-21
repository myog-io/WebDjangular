import { Component } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

@Component({
  selector: 'wda-form-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss']
})
export class BuilderFormSelectComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  loading = true;
  options = [];
  models = [];
  constructor(private datastore: WebAngularDataStore) { }

  ngOnInit() {
    this.options = this.config.options || [];
    if (this.config.model) {
      if (typeof this.config.model === 'string') {
        const models = Reflect.getMetadata(
          'JsonApiDatastoreConfig',
          this.datastore.constructor
        ).models;
        if (models[this.config.model]) {
          this.config.model = models[this.config.model];
        }
      }
      let query_options: any = {};
      if (this.config.options) {
        query_options = this.config.options;
      }
      query_options.page = { size: 50 };
      query_options.include = this.config.options_include;
      this.datastore
        .findAll(this.config.model, query_options)
        .subscribe(data => {
          this.models = data.getModels();
          this.options = [];
          for (let i = 0; i < this.models.length; i++) {
            const entry = this.models[i];

            this.options.push({
              id: entry.id,
              name: entry.toString()
            });
            this.loading = false;
          }
        });
    }
  }
}
