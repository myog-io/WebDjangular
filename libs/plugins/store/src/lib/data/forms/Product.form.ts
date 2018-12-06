import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';

export class ProductForm extends AbstractForm {

  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: SmartTableColumnType.text,
      },
      sku: {
        title: 'SKU',
        type: SmartTableColumnType.text,
      },
      type: {
        title: 'Type',
        type: SmartTableColumnType.text,
      }
    },
  };

  formFields = {
    pk: {
      type: FormControl,
    },
    sku: {
      type: FormControl,
      validators: [Validators.required] // TODO: validate the uniqueness
    },
    type: {
      type: FormControl,
      validators: [Validators.required]
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    slug: {
      type: FormControl,
      validators: [Validators.required, Validators.pattern("^[a-z0-9_-]{8,15}$")] // TODO: validate the uniqueness
    },
    description: {
      type: FormControl,
      validators: [Validators.required]
    },
    track_inventory: {
      type: FormControl,
      validators: [Validators.required]
    },
    quantity: {
      type: FormControl,
      validators: [Validators.required]
    },
    quantity_allocated: {
      type: FormControl,
      validators: [Validators.required]
    },
    cost: {
      type: FormControl,
      validators: [Validators.required]
    },
    created: {
      type: FormControl,
    },
    updated: {
      type: FormControl,
    },
  };

  scaffoldFields: BuilderFormFieldConfig[] = [
    {
      type: 'input',
      label: 'SKU',
      name: 'sku',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Type',
      name: 'type',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Slug',
      name: 'slug',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'textarea',
      label: 'Description',
      name: 'description',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Track inventory',
      name: 'track_inventory',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Quantity',
      name: 'quantity',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Quantity allocated',
      name: 'quantity_allocated',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'input',
      label: 'Cost',
      name: 'cost',
      wrapper_class: 'col-6',
      placeholder: '',
    },

  ]
}
