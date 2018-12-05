import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { StreetForm } from './Street.form';
import { RangeForm } from './Range.form';
import { SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';

export class CityForm extends AbstractForm {

  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: SmartTableColumnType.text,
      },
      short_name: {
        title: 'Short Name',
        type: SmartTableColumnType.text,
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
    postal_codes: {
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
      wrapper_class: 'col-6',
      placeholder: 'Enter City Name',
    },
    {
      type: 'input',
      label: 'Short Name',
      name: 'short_name',
      wrapper_class: 'col-6',
      placeholder: 'Entery City Short Name (NY)',
    },
    {
      type: 'formArray',
      label: 'Streets',
      name: 'streets',
      fields: new StreetForm().scaffoldFields,
      smart_table_mode: SmartTableSettingsMode.external,

    },
    {
      type: 'formArray',
      label: 'Postal Codes',
      name: 'postal_codes',
      fields: new RangeForm().scaffoldFields,
    }
  ]
}
