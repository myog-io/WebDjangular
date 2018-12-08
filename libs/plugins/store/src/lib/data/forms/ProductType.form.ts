import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';

export class ProductTypeForm extends AbstractForm {
  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: SmartTableColumnType.text,
      },
      created: {
        title: 'Created',
        type: SmartTableColumnType.text,
      },
      updated: {
        title: 'Created',
        type: SmartTableColumnType.text,
      }
    },
  };
  public formFields = {
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    attributes: {
      type: FormControl,
      validators: []
    },
  }
  public scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'name',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Attirbutes',
      name: 'attributes',
      wrapper_class: 'col-6',
      placeholder: '',
    },
  ]
}
