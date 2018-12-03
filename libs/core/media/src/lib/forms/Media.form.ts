import { FormControl, Validators } from '@angular/forms';

import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
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

  scaffoldFields: BuilderFormFieldConfig[] = [
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
    }
  ];
}
