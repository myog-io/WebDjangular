import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';

export class ProductPriceForm extends AbstractForm {
  public listingTableSettings: SmartTableSettings = {
    columns: {
      list: {
        title: 'List Price',
        type: SmartTableColumnType.text,
      },
      sale: {
        title: 'Sale Price',
        type: SmartTableColumnType.text,
      }
    },
  };
  public formFields = {
    list: {
      type: FormControl,
      validators: [Validators.required]
    },
    sale: {
      type: FormControl,
      validators: []
    },
  }
  public scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'List Price',
      name: 'list',
      inputType: 'number',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Sale Price',
      name: 'sale',
      inputType: 'number',
      wrapper_class: 'col-6',
      placeholder: '',
    },
  ]
}
