import { FormControl, Validators } from '@angular/forms';

import { ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { AbstractForm } from '@webdjangular/core/data-forms';

export class MediaForm extends AbstractForm {
  public listingTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      file: {
        title: 'File',
        type: 'string'
      }
    }
  };

  formFields = {
    pk: {
      type: FormControl
    },
    file: {
      type: FormControl,
      validators: [Validators.required]
    },
    alt: {
      type: FormControl
    },
    created: {
      type: FormControl
    },
    updated: {
      type: FormControl
    }
  };

  scaffoldFields: ScaffoldFieldConfig[] = [
    {
      type: 'input',
      label: 'File',
      name: 'file',
      placeholder: 'Upload File'
    },
    {
      type: 'input',
      label: 'Alt',
      name: 'alt',
      placeholder: 'Image Alt Description'
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];
}
