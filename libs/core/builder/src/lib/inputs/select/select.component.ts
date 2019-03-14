import { Component } from '@angular/core';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
})
export class BuilderFormSelectComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  options = [];

  ngOnInit() {
    this.options = this.config.options || [];
  }

}
