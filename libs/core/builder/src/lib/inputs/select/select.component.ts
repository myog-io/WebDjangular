import { Component, OnInit } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wda-form-select',
  styleUrls: ['select.component.scss'],
  template: `
    <div class="form-group form-select" [formGroup]="config.options_model ? group.get(config.name) : group" >
      <label>{{ config.label }}</label>
      <ng-select class="form-control" (change)="onChange($event)" [formControlName]="config.options_model ? 'id' : config.name" [multiple]="config.multiple" [loading]="loading" [placeholder]="placeholder">
        <ng-option *ngFor="let option of options" value="{{option.value}}">
          {{option.label}}
        </ng-option>
      </ng-select>
      <wda-form-validators
        [config]="config.options_model ? group.get(config.name) : group"
        [input]="config.options_model ? group.get('id') : group.get(config.name)">
      </wda-form-validators>
    </div><!--form-group-->
  `
})
export class BuilderFormSelectComponent implements BuilderFormField, OnInit {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  loading = true;
  options = [];
  placeholder = "Select Option";
  models = [];
  subsciption: Subscription;
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

        this.models = data.getModels();
        this.options = [];
        for (let i = 0; i < this.models.length; i++) {
          const entry = this.models[i];

          this.options.push({
            value: entry.id,
            label: entry.toString()
          });
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
      this.options = this.config.options || [];

    }
    if (this.config.value) {
      this.group.get(this.config.name).setValue(this.config.value);
      this.onChange(this.config.value);
    }
    let sub: Subscription;
    sub = this.group.get(this.config.name).valueChanges.subscribe((value) => {
      if (sub) sub.unsubscribe();

      this.onChange(value);
    });
  }


  onChange($event) {
    if ($event) {
      this.placeholder = "";
    } else {
      this.getPlaceHolder();
    }

    this.updateValue($event);

  }

  updateValue(value) {
    if (this.group.formFields[this.index].type == FormGroup) {
      const fg = this.group.get(this.config.name) as AbstractForm;
      fg.populateForm(this.models.find((model) => model.pk == value))
    } else {
      this.group.get(this.config.name).setValue(value);
    }
  }

  private getPlaceHolder(): void {
    this.placeholder = this.config.placeholder || "Select Option";
  }
}
