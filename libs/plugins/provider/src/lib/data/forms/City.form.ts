import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { StreetForm } from './Street.form';
import { RangeForm } from './Range.form';
import { SmartTableSettings } from '@webdjangular/core/data';
import { StreetModel } from '../models/Street.model';
import { RangeModel } from '../models/Range.model';

export class CityForm extends AbstractForm {
/*
  public listingTableSettings: SmartTableSettings = {
    columns: {
      id: {
        title: '#',
        type: 'text',
      },
      name: {
        title: 'Name',
        type: 'text',
      },
      short_name: {
        title: 'Short Name',
        type: 'text',
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
      model: StreetModel,
    },
    postal_codes: {
      type: FormArray,
      model: RangeModel,
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
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-6',
      placeholder: 'Enter City Name',
    },
    {
      type: 'text',
      label: 'Short Name',
      name: 'short_name',
      wrapper_class: 'col-6',
      placeholder: 'Entery City Short Name (NY)',
    },
    {
      type: 'formArray',
      label: 'Streets',
      name: 'streets',
      //fields: StreetForm.scaffoldFields,
      smart_table_mode: 'external',

    },
    {
      type: 'formArray',
      label: 'Postal Codes',
      name: 'postal_codes',
      //fields: new RangeForm().scaffoldFields,
    }
  ]
  */
}
