import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';

export class SaleForm extends AbstractForm {

  public listingTableSettings: SmartTableSettings = {
    columns: {
      type: {
        title: 'Type',
        type: SmartTableColumnType.text,
      },
      name: {
        title: 'Name',
        type: SmartTableColumnType.text,
      },
      value: {
        title: 'Value',
        type: SmartTableColumnType.text,
      },
      is_active: {
        title: 'Active',
        type: SmartTableColumnType.text,
      },
      start: {
        title: 'Start Date/Time:',
        type: SmartTableColumnType.text,
      },
      end: {
        title: 'End Date/Time',
        type: SmartTableColumnType.text,
      }
    },
  };

  formFields = {
    pk: {
      type: FormControl,
    },
    type: {
      type: FormControl,
      validators: [Validators.required]
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    start: {
      type: FormControl,
      validators: [Validators.required]
    },
    end: {
      type: FormControl,
      validators: [Validators.required]
    }
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Type',
      name: 'type',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Start Date/Time',
      name: 'start',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'End Date/Time',
      name: 'end',
      wrapper_class: 'col-6',
      placeholder: '',
    }
  ]
}
