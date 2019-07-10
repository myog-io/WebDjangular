import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wda-form-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss']
})
export class BuilderFormCheckboxComponent implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  loading = true;
  options = [];
  results = [];
  models = [];
  form: FormGroup;
  listener: Subscription;
  constructor(
    private datastore: WebAngularDataStore,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      options: new FormArray([])
    });
  }

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
          this.addCheckboxes();
        });
    } else {
      this.addCheckboxes();
    }
  }
  ngOnDestroy() {
    if (this.listener) {
      this.listener.unsubscribe();
      this.listener = null;
    }
  }
  private addCheckboxes() {
    this.options.map((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.form.controls.options as FormArray).push(control);
    });
    this.listener = this.form.get('options').valueChanges.subscribe((value) => {
      this.results = [];
      this.options.map((val, index) => {
        if (value[index] === true) {
          this.results.push(val.id);
        }
      })
      if (this.options.length > 1) {
        // Options are more than one, so it's expected a List
        this.group.get(this.config.name).setValue(this.results)
      } else {
        this.group.get(this.config.name).setValue(this.results.length > 0 ? this.results[0] : false);
      }
    })
  }
  get isFormGroup(): boolean {
    return this.config.model && this.config.formType == FormGroup;
  }
}
