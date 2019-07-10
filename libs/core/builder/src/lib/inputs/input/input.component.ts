import { Component } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss']
})
export class BuilderFormInputComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
