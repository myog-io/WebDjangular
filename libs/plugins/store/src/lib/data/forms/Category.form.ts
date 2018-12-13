import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings } from '@webdjangular/core/data';

export class CategoryForm extends AbstractForm {



  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      description: {
        title: 'Description',
        type: 'text',
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
      validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')]
    },
    description: {
      type: FormControl,
      validators: [Validators.required]
    }
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Slug',
      name: 'slug',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Description',
      name: 'description',
      wrapper_class: 'col-12',
      placeholder: '',
    }
  ]
}
