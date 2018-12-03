import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { Subscription } from 'rxjs';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-formbuilder',
  styleUrls: [],
  template: `
    <div class="form-group" [formGroup]="group" >

    </div>
  `
})
export class BuilderFormBuilderComponent implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
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
      (error: any) => {}
    );
  }

  ngOnDestroy() {
    if (this.valueSub) {
      this.valueSub.unsubscribe();
    }
    this.valueSub = null;
  }
  onFormBuilderChanges(event) {
    this.relationshipUpdated.emit({
      name: this.config.name,
      entity: { data: event.form }
    });
  }
}
