import { Component, OnInit } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-datepicker',
  styleUrls: ['datepicker.component.scss'],
  templateUrl: 'datepicker.component.html'
})
export class BuilderFormDatepickerComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  // TODO: Improve with Min max and other rules like formatting
}
