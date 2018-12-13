import { FormControl, Validators } from '@angular/forms';

import { AbstractForm } from './Abstract.form';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

export class PluginForm extends AbstractForm {
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
      slug: {
        title: 'Url Path',
        type: 'string'
      },
      version: {
        title: 'Version',
        type: 'string'
      },
      current_version: {
        title: 'Current Version',
        type: 'string'
      },
      active: {
        title: 'Active',
        type: 'string'
      }
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
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    angular_module: {
      type: FormControl,
      validators: [Validators.required]
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
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter Theme Name'
    },
    {
      type: 'text',
      label: 'Active',
      name: 'active',
      placeholder: 'Enter Page Url (slug)'
    }
  ];
}
