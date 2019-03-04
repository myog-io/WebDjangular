import { Component } from '@angular/core';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-input',
  styleUrls: ['input.component.scss'],
  templateUrl: 'input.component.html',
})
export class BuilderFormInputComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
