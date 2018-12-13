import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

export class CoreConfigForm extends AbstractForm {
  public listingTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      slug: {
        title: 'Slug',
        type: 'string'
      },
      value: {
        title: 'Value',
        type: 'string'
      },
    }
  };

  formFields = {
    pk: {
      type: FormControl
    },
    slug: {
      type: FormControl,
      validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')]
    },
    value: {
      type: FormControl,
      validators: [Validators.required]
    },
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Slug(code)',
      name: 'slug',
      placeholder: 'Enter Theme Slug'
    },
    {
      type: 'text',
      label: 'Value',
      name: 'value',
      placeholder: 'Enter Value'
    }
  ];
}
