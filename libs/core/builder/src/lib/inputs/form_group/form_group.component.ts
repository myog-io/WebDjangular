import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { Subscription } from 'rxjs';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-formbuilder',
  styleUrls: [],
  template: `
    <div class="form-group" [formGroup]="group" >
      <wda-form [fields]="fields" (onSubmit)="submitModal($event)" (relationshipUpdated)="relationshipUpdated($event)" [group]="this.group.get(this.config.name)" [loading]="loading" [submit]="submit"></wda-form>
    </div>
  `
})
export class BuilderFormGroupComponent implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  form: AbstractForm;
  fields: BuilderFormFieldConfig[] = [];
  loading:boolean = false;
  submit:boolean = false;

  ngOnInit() {
    this.getFormConfig();
  }

  ngOnDestroy() {

  }
  onFormBuilderChanges(event) {

  }
  /**
   * When the smart_table_settings.mode is `external` we have to get the form config information
   */
  private getFormConfig() {
    if (this.group.formFields[this.config.name].formClass) {
      this.form = new this.group.formFields[this.config.name].formClass();
      this.form.generateForm();
      this.fields = this.form.scaffoldFields;
    } else {
      throw new Error(
        `Form Array require formClass inside formFields[${this.config.name}]`
      );
    }
  }
}
