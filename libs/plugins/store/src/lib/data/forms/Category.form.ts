import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';

export class CategoryForm extends AbstractForm {



  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: SmartTableColumnType.text,
      },
      description: {
        title: 'Description',
        type: SmartTableColumnType.text,
      }
    },
  };

  formFields = {
    pk: {
      type: FormControl,
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    slug: {
      type: FormControl,
      validators: [Validators.required]
    },
    description: {
      type: FormControl,
      validators: [Validators.required]
    }
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Slug',
      name: 'slug',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Description',
      name: 'description',
      wrapper_class: 'col-12',
      placeholder: '',
    }
  ]
}
