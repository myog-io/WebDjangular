import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wda-form-code',
  styleUrls: ['code.component.scss'],
  templateUrl: 'code.component.html'
})
export class BuilderFormCodeComponent
  implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  editorOptions = { theme: 'vs-dark', language: 'html' };
  sub: Subscription;
  class = 'large';
  ngOnInit() {
    if (this.config.options) {
      this.editorOptions = Object.assign(
        this.editorOptions,
        this.config.options
      );
    }
    if (this.config.element_class) {
      this.class = this.config.element_class;
    }
    if (this.group.get(this.config.name).value) {
      this.fromJson(this.group.get(this.config.name).value);
    } else {
      // TODO: Invalid Json
      this.sub = this.group
        .get(this.config.name)
        .valueChanges.subscribe(value => {
          if (value) {
            this.fromJson(value);
            this.sub.unsubscribe();
          }
        });
    }
  }
  fromJson(value) {
    if (typeof value === 'object') {
      this.group
        .get(this.config.name)
        .setValue(JSON.stringify(value, null, 2), { emitEvent: false });
    }
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
