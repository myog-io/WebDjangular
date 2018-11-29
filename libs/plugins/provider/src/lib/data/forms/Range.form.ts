import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { ScaffoldFieldConfig } from '@webdjangular/core/interfaces';

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

  scaffoldFields: ScaffoldFieldConfig[] = [
    {
      type: 'input',
      inputType: 'number',
      label: 'Start',
      name: 'start',
      placeholder: 'Start of the Range',
    },
    {
      type: 'input',
      inputType: 'number',
      label: 'End',
      name: 'end',
      placeholder: 'End of the Range',
    },

  ]
}
