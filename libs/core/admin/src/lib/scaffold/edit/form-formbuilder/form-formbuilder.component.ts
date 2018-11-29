import {Component, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {ScaffoldField, ScaffoldFieldConfig} from '@webdjangular/core/interfaces';
import {AbstractForm} from '@webdjangular/core/data-forms';
import { Subscription } from 'rxjs';


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
export class ScaffoldFormFormbuilderComponent extends ScaffoldField implements OnInit, OnDestroy {
  config: ScaffoldFieldConfig;
  group: AbstractForm;
  relationshipUpdated: EventEmitter<any>;
  value: object = {};
  valueSub: Subscription;
  ngOnInit() {
    this.valueSub = this.group.get(this.config.name).valueChanges.subscribe(
      (data: any) => {
        this.value = data;
        this.valueSub.unsubscribe();
        this.valueSub = null;
      },
      (error: any) => {

      });
  }

  ngOnDestroy() {
    if(this.valueSub) {
      this.valueSub.unsubscribe()
    }
    this.valueSub = null
  }
  onFormBuilderChanges(event) {

    this.relationshipUpdated.emit({'name':this.config.name,'entity': {data:event.form } });
  }

}
