import {FormControl, Validators, FormGroup, FormArray} from '@angular/forms';

import {AbstractForm} from '@webdjangular/core/data-forms';
import {BuilderFormFieldConfig} from '@webdjangular/core/builder';

import {SmartTableSettings} from '@webdjangular/core/data';
import {ProductClasses} from '../interfaces/Product.interface';
import {ProductTypeModel} from '../models/ProductType.model';
import {ProductPriceModel} from '../models/ProductPrice.model';

export class ProductForm extends AbstractForm implements SEOForm{

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
    product_type: {
      type: FormGroup,
      validators: [Validators.required],
      model: ProductTypeModel
    },
    product_class: {
      type: FormControl,
      validators: [Validators.required]
    },
    sku: {
      type: FormControl,
      validators: [Validators.required] // TODO: validate the uniqueness
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
      validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')]
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
    attributes: {
      type: FormGroup,
      validators: []
    },
    seo_title: {
      type: FormGroup,
      validators: []
    },
    seo_description: {
      type: FormGroup,
      validators: []
    },
    created: {
      type: FormControl,
    },
    updated: {
      type: FormControl,
    },
  };

  scaffoldFieldsType: BuilderFormFieldConfig[] = [
    {
      type: 'select',
      label: 'Type',
      name: 'product_type',
      wrapper_class: 'col-12',
      placeholder: 'Select the Product Type',
      //value: null,
      options_model: ProductTypeModel
    },
  ];

  scaffoldFieldsGeneral: BuilderFormFieldConfig[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Slug',
      name: 'slug',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'text',
      label: 'SKU',
      name: 'sku',
      wrapper_class: 'col-12',
      placeholder: '',
    },
    {
      type: 'ckeditor',
      label: 'Description',
      name: 'description',
      wrapper_class: 'col-12',
      placeholder: '',
    },
  ];

  scaffoldFieldsPricing: BuilderFormFieldConfig[] = [
    {
      type: 'formGroup',
      label: 'Price',
      name: 'pricing',
      wrapper_class: 'col-6',
    },
  ];

  scaffoldFieldsSEO: BuilderFormFieldConfig[] = [
    {
      type: 'formGroup',
      label: 'Title',
      name: 'seo_title',
      wrapper_class: 'col-12',
    },
    {
      type: 'formGroup',
      label: 'Description',
      name: 'seo_description',
      wrapper_class: 'col-12',
    },
  ];

  scaffoldFieldsShipping: BuilderFormFieldConfig[] = [
    {
      type: 'switch',
      label: 'Shippable',
      name: 'shippable',
      wrapper_class: 'col-6',
      value: false,
      placeholder: '',
    },
    /*
    {
      type: 'text',
      label: 'Weight',
      name: 'weight ',
      inputType: 'number',
      wrapper_class: 'col-12',
      placeholder: '',
      conditional: {
        '==': [
          {var: 'shippable'},
          true
        ]
      }
    },
    {
      type: 'text',
      label: 'Width',
      name: 'width ',
      inputType: 'number',
      wrapper_class: 'col-12',
      placeholder: '',
      conditional: {
        '==': [
          {var: 'shippable'},
          true
        ]
      }
    },
    {
      type: 'text',
      label: 'Height',
      name: 'height ',
      inputType: 'number',
      wrapper_class: 'col-12',
      placeholder: '',
      conditional: {
        '==': [
          {var: 'shippable'},
          true
        ]
      }
    },
    {
      type: 'text',
      label: 'Depth',
      name: 'depth ',
      inputType: 'number',
      wrapper_class: 'col-12',
      placeholder: '',
      conditional: {
        '==': [
          {var: 'shippable'},
          true
        ]
      }
    },
    */
  ];

  scaffoldFieldsMedias: BuilderFormFieldConfig[] = [

  ];

  scaffoldFieldsInventory: BuilderFormFieldConfig[] = [
    {
      type: 'switch',
      label: 'Track inventory',
      name: 'track_inventory',
      wrapper_class: 'col-6',
      value: false,
      placeholder: '',
    },
    {
      type: 'text',
      label: 'Quantity',
      name: 'quantity',
      inputType: 'number',
      wrapper_class: 'col-12',
      placeholder: '',
      conditional: {
        '==': [
          {var: 'track_inventory'},
          true
        ]
      }
    },
    {
      type: 'text',
      label: 'Cost',
      name: 'cost',
      inputType: 'number',
      wrapper_class: 'col-12',
      placeholder: '',
    },
  ];

  scaffoldFields: BuilderFormFieldConfig[] = [
    ...this.scaffoldFieldsType,
    ...this.scaffoldFieldsGeneral,
    {
      type: 'select',
      label: 'Product Class',
      name: 'product_class',
      wrapper_class: 'col-6',
      value: ProductClasses.simple,
      options: [
        {label: "Simple Product", value: ProductClasses.simple},
        {label: "Bundle Product", value: ProductClasses.bundle},
        {label: "Variant Product", value: ProductClasses.variant},
      ]
    },









  ]
}
