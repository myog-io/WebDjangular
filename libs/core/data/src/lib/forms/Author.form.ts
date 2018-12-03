import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

export class AuthorForm extends AbstractForm {
  public listingTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      name: {
        title: 'Name',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      website: {
        title: 'Website',
        type: 'string'
      }
    }
  };

  formFields = {
    pk: {
      type: FormControl
    },
    name: {
      type: FormControl,
      validators: []
    },
    email: {
      type: FormControl,
      validators: [Validators.email]
    },
    website: {
      type: FormControl,
      validators: []
    },
    active: {
      type: FormControl
    },
    created: {
      type: FormControl
    },
    updated: {
      type: FormControl
    }
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter Theme Name'
    },
    {
      type: 'input',
      label: 'Email',
      name: 'email',
      placeholder: 'Email'
    }
  ];
}
