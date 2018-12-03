import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { RangeForm } from './Range.form';

export class StreetForm extends AbstractForm {

  public listingTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      short_name: {
        title: 'Short Name',
        type: 'string',
      },
    },
  };

  formFields = {
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    short_name: {
      type: FormControl,
      validators: [Validators.required]
    },
    numbers: {
      type: FormGroup,
      formClass: RangeForm,
    }

  }

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'input',
      inputType: 'input',
      label: 'Name',
      name: 'name',
      placeholder: 'Stret Name',
    },
    {
      type: 'input',
      inputType: 'input',
      label: 'Short Name',
      name: 'short_name',
      wrapper_class: 'col-12',
      placeholder: 'Street Short Name',
    },

  ]
}
