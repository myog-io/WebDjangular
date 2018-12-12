import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig } from '@webdjangular/core/builder';

import { SmartTableSettings} from '@webdjangular/core/data';
import { ProductClasses } from '../interfaces/Product.interface';
import { ProductTypeModel } from '../models/ProductType.model';
import { ProductPriceModel } from '../models/ProductPrice.model';

export class ProductForm extends AbstractForm {

  public listingTableSettings: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      sku: {
        title: 'SKU',
        type: 'text',
      },
      type: {
        title: 'Type',
        type: 'text',
      },
      product_class: {
        title: 'Class',
        type: 'text',
      }
    },
  };

  formFields = {
    pk: {
      type: FormControl,
    },
    product_class: {
      type: FormControl,
      validators: [Validators.required]
    },
    sku: {
      type: FormControl,
      validators: [Validators.required] // TODO: validate the uniqueness
    },
    product_type: {
      type: FormGroup,
      validators: [Validators.required],
      model: ProductTypeModel
    },
    name: {
      type: FormControl,
      validators: [Validators.required]
    },
    pricing: {
      type: FormGroup,
      validators: [Validators.required],
      model: ProductPriceModel,
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
      type: 'select',
      label: 'Product Class',
      name: 'product_class',
      wrapper_class: 'col-6',
      value: ProductClasses.simple,
      options: [
        {label:"Simple Product", value: ProductClasses.simple},
        {label:"Bundle Product", value: ProductClasses.bundle},
        {label:"Variant Product", value: ProductClasses.variant},
      ]
    },
    {
      type: 'text',
      label: 'SKU',
      name: 'sku',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'select',
      label: 'Type',
      name: 'product_type',
      wrapper_class: 'col-6',
      placeholder: 'Select Product Type',
      //value: null,
      options_model: ProductTypeModel
    },
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'formGroup',
      label: 'Price',
      name: 'pricing',
      wrapper_class: 'col-6',
    },
    {
      type: 'text',
      label: 'Slug',
      name: 'slug',
      wrapper_class: 'col-6',
      placeholder: '',
    },
    {
      type: 'ckeditor',
      label: 'Description',
      name: 'description',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'switch',
      label: 'Track inventory',
      name: 'track_inventory',
      wrapper_class: 'col-2',
      value: false,
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Quantity',
      name: 'quantity',
      inputType: 'number',
      wrapper_class: 'col-6',
      placeholder: '',
      conditional: {
        '==':[
          {var:'track_inventory'},
          true
        ]
      }
    },
    {
      type: 'text',
      label: 'Cost',
      name: 'cost',
      inputType: 'number',
      wrapper_class: 'col-6',
      placeholder: '',
    },

  ]
}
