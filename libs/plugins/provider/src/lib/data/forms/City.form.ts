import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { StreetForm } from './Street.form';
import { RangeForm } from './Range.form';

export class CityForm extends AbstractForm {

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
    pk: {
      type: FormControl,
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    short_name: {
      type: FormControl,
      validators: [Validators.required]
    },
    streets: {
      type: FormArray,
      formClass: StreetForm,
    },
    zips: {
      type: FormArray,
      formClass: RangeForm,
    },
    created: {
      type: FormControl,
    },
    updated: {
      type: FormControl,
    },
  }

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter City Name',
    },
    {
      type: 'input',
      label: 'Short Name',
      name: 'short_name',
      placeholder: 'Entery City Short Name (NY)',
    },
    {
      type: 'formArray',
      label: 'Streets',
      name: 'streets',
      fields: new StreetForm().scaffoldFields,
    }
  ]
}
