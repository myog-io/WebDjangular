import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

export class CoreWebsiteForm extends AbstractForm {
  public listingTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      domain: {
        title: 'Domain',
        type: 'string'
      },
      code: {
        title: 'Code',
        type: 'string'
      },
    }
  };

  formFields = {
    pk: {
      type: FormControl
    },
    domain: {
      type: FormControl,
      validators: [
        Validators.required,
      ]
    },
    code: {
      type: FormControl,
      validators: [Validators.required]
    },

  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'input',
      label: 'Domain',
      name: 'domain',
      placeholder: 'Enter The Website Domain'
    },
    {
      type: 'input',
      label: 'Code',
      name: 'code',
      placeholder: 'Enter Code'
    }
  ];
}
