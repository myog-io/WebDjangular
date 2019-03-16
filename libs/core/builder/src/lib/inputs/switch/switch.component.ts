import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { Subscription } from 'rxjs';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-switch',
  styleUrls: ['switch.component.scss'],
  templateUrl: 'switch.component.html'
})
export class BuilderFormSwitcherComponent
  implements BuilderFormField, OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  alive = true;

  first_value = false;
  second_value = true;
  first_label = 'NO';
  second_label = 'YES';
  vertical = false;
  value: any = true;
  sub: Subscription;
  ngOnInit() {
    this.first_value =
      typeof this.config.switch_first_value != 'undefined'
        ? this.config.switch_first_value
        : this.first_value;
    this.second_value =
      typeof this.config.switch_second_value != 'undefined'
        ? this.config.switch_second_value
        : this.second_value;
    this.first_label =
      typeof this.config.switch_first_label != 'undefined'
        ? this.config.switch_first_label
        : this.first_label;
    this.second_label =
      typeof this.config.switch_second_label != 'undefined'
        ? this.config.switch_second_label
        : this.second_label;
    this.vertical =
      typeof this.config.switch_vertical != 'undefined'
        ? this.config.switch_vertical
        : this.vertical;
    this.value =
      typeof this.config.value != 'undefined' ? this.config.value : this.value;
    //this.group.get(this.config.name).setValue(this.value);
    this.value = this.group.get(this.config.name).value;
    this.sub = this.group.get(this.config.name).valueChanges.subscribe(val => {
      this.value = val;
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  isFirstValue() {
    return this.value === this.first_value;
  }

  isSecondValue() {
    return this.value === this.second_value;
  }

  currentValueLabel() {
    return this.isFirstValue() ? this.first_label : this.second_label;
  }

  changeValue() {
    this.value = this.isFirstValue() ? this.second_value : this.first_value;
    this.group.get(this.config.name).setValue(this.value);
  }
}
