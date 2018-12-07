import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';

export class VoucherForm extends AbstractForm {

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
      code: {
        title: 'Code',
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
    code: {
      type: FormControl,
      validators: [Validators.required]
    },
    usage_limit: {
      type: FormControl,
      validators: [Validators.required]
    },
    used: {
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
    },
    apply_once_per_order: {
      type: FormControl,
      validators: [Validators.required]
    },
    discount_value_type: {
      type: FormControl,
      validators: [Validators.required]
    },
    discount_value: {
      type: FormControl,
    },
    min_amount_spent: {
      type: FormControl,
    },
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
      label: 'Code',
      name: 'code',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Usage limit',
      name: 'usage_limit',
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
    },
    {
      type: 'text',
      label: 'Apply once per order',
      name: 'apply_once_per_order',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Discount type',
      name: 'discount_value_type',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Discount value',
      name: 'discount_value',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'min amount spent',
      name: 'min_amount_spent',
      wrapper_class: 'col-6',
      placeholder: '',
    },

  ]
}
