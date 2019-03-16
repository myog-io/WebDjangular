import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig,
  BuilderFormDisplayGroups
} from '../../interfaces/form-config.interface';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

@Component({
  selector: 'wda-form-formbuilder',
  styleUrls: [],
  template: `
    <div class="form-group" [formGroup]="group" *ngIf="!loading">
      <wda-form-builder
        [displayGroups]="form.displayGroups"
        (onSubmit)="submitModal($event)"
        (relationshipUpdated)="relationshipUpdated($event)"
        [group]="this.group.get(this.config.name)"
        [loading]="loading"
        [submit]="submit"
      ></wda-form-builder>
    </div>
  `
})
export class BuilderFormGroupComponent
  implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  form: AbstractForm;
  displayGroups: BuilderFormDisplayGroups[];
  loading: boolean = true;
  submit: boolean = false;
  subscription: Subscription;

  /**
   * Creates an instance of scaffold form select component.
   * @param datastore
   */
  constructor(private datastore: WebAngularDataStore) {}

  ngOnInit() {
    this.getFormConfig();
  }

  ngOnDestroy() {}
  onFormBuilderChanges(event) {}
  private generateFormFields(data_fields) {
    let fields: BuilderFormFieldConfig[] = [];
    let fg = this.group.get(this.config.name) as FormGroup;
    for (let i = 0; i < data_fields.length; i++) {
      const element = data_fields[i];
      let field: BuilderFormFieldConfig = {
        label: element.name,
        type: element.class_type,
        name: element.code
      };
      if (element.options) {
        field.options = element.options;
      }
      if (element.required) {
        field.validation = [Validators.required];
      } else {
        field.validation = [];
      }
      fields.push(field);
      fg.registerControl(element.code, new FormControl(null, field.validation));
    }
    if (this.group.entity && this.group.entity[this.config.name]) {
      for (const key in this.group.entity[this.config.name]) {
        if (this.group.entity[this.config.name].hasOwnProperty(key)) {
          const value = this.group.entity[this.config.name][key];
          if (typeof value !== 'undefined' && fg.get(key)) {
            fg.get(key).setValue(value);
          }
        }
      }
      //fg.setValue(this.group.entity[this.config.name])
    }
    this.form = new AbstractForm(this.datastore);
    this.form.displayGroups = [
      {
        wrapper_class: 'col-12',
        groups: [
          {
            name: 'default',
            title: null,
            sidebar: false,
            fields: fields
          }
        ],
        conditional: null,
        sort: 0
      }
    ];
  }
  /**
   * When the smart_table_settings.mode is `external` we have to get the form config information
   */
  private getFormConfig() {
    if (this.config.copyOptions) {
      const options = this.config.copyOptions;
      const value = this.group.get(options.name).value;
      if (value[options.field]) {
        if (value[options.field].length <= 0 && this.config.model && value.id) {
          this.datastore
            .findRecord(this.config.model, value.id, { include: options.field })
            .subscribe(data => {
              this.generateFormFields(data[options.field]);
              this.loading = false;
            });
        } else {
          this.generateFormFields(value[options.field]);
          this.loading = false;
        }
      } else if (this.config.model) {
        let entity = new this.config.model();
        this.form = entity.getForm();
        this.form.generateForm();
        this.displayGroups = this.form.displayGroups;
        this.loading = false;
      } else {
        throw new Error(
          `${this.config.copyOptions.field} does not exits inside the object ${
            this.config.copyOptions.name
          }`
        );
      }
    } else {
      throw new Error(
        `Form Group require a 'model' or a 'copyOptions' with formClassRef inside formFields[${
          this.config.name
        }]`
      );
    }
  }
}
