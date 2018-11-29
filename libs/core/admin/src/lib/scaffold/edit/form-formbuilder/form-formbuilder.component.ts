import {Component, EventEmitter, OnInit} from '@angular/core';
import {ScaffoldField, ScaffoldFieldConfig} from '@webdjangular/core/interfaces';
import {AbstractForm} from '@webdjangular/core/data-forms';


@Component({
  selector: 'wda-form-formbuilder',
  styleUrls: [],
  template: `
    <div class="form-group" [formGroup]="group" *ngIf="ng_if()">
      <form-builder [form]="value" (change)="onFormBuilderChanges($event)">
      </form-builder>
    </div>
  `
})
export class ScaffoldFormFormbuilderComponent extends ScaffoldField implements OnInit {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
  relationshipUpdated: EventEmitter<any>;
  value: object = {};

  ngOnInit() {
    this.group.get(this.config.name).valueChanges.subscribe(
      (data: any) => {
        this.value = JSON.parse(data);
      },
      (error: any) => {

      });
  }

  onFormBuilderChanges(event) {
    const data: string = JSON.stringify(event.form);
    this.relationshipUpdated.emit({'name':this.config.name,'entity': data });
  }

}
