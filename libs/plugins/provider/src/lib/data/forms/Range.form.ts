import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

export class RangeForm extends AbstractForm {

  public listingTableSettings = {
    columns: {
      start: {
        title: 'Start',
        type: 'string',
      },
      end: {
        title: 'End',
        type: 'string',
      },
    },
  };

  formFields = {
    start: {
      type: FormControl,
      validators: [Validators.required]
    },
    end: {
      type: FormControl,
      validators: [Validators.required]
    }
  }

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      inputType: 'number',
      label: 'Start',
      name: 'start',
      placeholder: 'Start of the Range',
    },
    {
      type: 'text',
      inputType: 'number',
      label: 'End',
      name: 'end',
      placeholder: 'End of the Range',
    },

  ]
}
