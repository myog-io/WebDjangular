import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { RangeForm } from './Range.form';
import { SmartTableSettings } from '@webdjangular/core/data';
import { RangeModel } from '../models/Range.model';

export class StreetForm extends AbstractForm {

  public listingTableSettings:SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      short_name: {
        title: 'Short Name',
        type: 'text',
      }
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
      type: FormArray,
      model: RangeModel,
    }

  }

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      inputType: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'Stret Name',
    },
    {
      type: 'text',
      inputType: 'text',
      label: 'Short Name',
      name: 'short_name',
      wrapper_class: 'col-12',
      placeholder: 'Street Short Name',
    },
    {
      type: 'formArray',
      label: 'Number Range',
      name: 'numbers',
      //fields: new RangeForm().scaffoldFields,
    }

  ]
}
