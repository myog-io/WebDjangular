import { Component, ViewEncapsulation } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-label',
  templateUrl: 'label.component.html',
  encapsulation: ViewEncapsulation.None

})
export class BuilderFormLabelComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
}
