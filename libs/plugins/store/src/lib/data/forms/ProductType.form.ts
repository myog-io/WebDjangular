import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings} from '@webdjangular/core/data';

export class ProductTypeForm extends AbstractForm {
  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      created: {
        title: 'Created',
        type: 'text',
      },
      updated: {
        title: 'Created',
        type: 'text',
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
