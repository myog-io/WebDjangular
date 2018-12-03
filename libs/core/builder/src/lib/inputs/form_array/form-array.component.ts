import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { Subscription } from 'rxjs';
import { WebAngularSmartTableDataSourceOptions } from '@webdjangular/core/data';

/**
 * This class will Implement a Smart Table with Add and Fielter Button
 */
@Component({
  selector: 'wda-form-array',
  styleUrls: ['form-array.component.scss'],
  template: `

      <ng2-smart-table
      [settings]="settings"
      [source]="source"
      (create)="onCreate()"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)">
      ></ng2-smart-table>

`
})
export class BuilderFormArrayComponent implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  source: any;
  settings: any = {}
  subscription: Subscription;
  ngOnInit() {
    this.updateSettings();
    this.subscription = this.group.get(this.config.name).valueChanges.subscribe((value) => {
      this.source = value;
    })
  }

  private updateSettings() {
    const smartTableSettings = {
      editable: true,
      mode: 'inline',
      columns: {

      }
    }
    if (this.config.fields) {

      for (const key in this.config.fields) {
        if (this.config.fields.hasOwnProperty(key)) {
          const element = this.config.fields[key];
          smartTableSettings.columns[element.name] = {
            title: element.label,
            type: 'string',
          }
        }
      }
    } else {
      throw new Error(
        `Form Array require Fields Configuration on BuilderFormFieldConfig`
      );
    }
    this.settings = Object.assign(
      {},
      WebAngularSmartTableDataSourceOptions.SMART_TABLE_SETTINGS,
      smartTableSettings
    );
  }

  ngOnDestroy() {

  }

  onDelete() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null;
    }
  }

  onCreate() {

  }

  onEdit() {

  }

}
