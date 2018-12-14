import { Attribute, BelongsTo, JsonApiModelConfig } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';

import { ProductClasses, ProductPrice } from '../interfaces/Product.interface';
import { ProductTypeModel } from './ProductType.model';
import { SmartTableSettings } from '@webdjangular/core/data';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { Validators, FormArray, FormGroup } from '@angular/forms';
import { ProductPriceModel } from './ProductPrice.model';


@JsonApiModelConfig({
  type: 'Product',
  modelEndpointUrl: 'store/product',
})
export class ProductModel extends AbstractModel {
  public static include = 'product_type';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'SKU',
    wrapper_class: 'col-12',
    placeholder: '',
  })
  sku: string;

  @BelongsTo()
  @ExtraOptions({
    validators: [Validators.required],
    model: ProductTypeModel,
    type: 'select',
    label: 'Type',
    wrapper_class: 'col-12',
    placeholder: 'Select the Product Type',
    //value: null,
    options_model: ProductTypeModel
  })
  product_type: ProductTypeModel;


  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-12',
    placeholder: '',
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'select',
    label: 'Product Class',
    wrapper_class: 'col-6',
    value: ProductClasses.simple,
    options: [
      {label: "Simple Product", value: ProductClasses.simple},
      {label: "Bundle Product", value: ProductClasses.bundle},
      {label: "Variant Product", value: ProductClasses.variant},
    ]
  })
  product_class: ProductClasses;

  @Attribute()
  @ExtraOptions({
    formType: FormGroup,
    validators: [Validators.required],
    model: ProductPriceModel,
    type: 'formGroup',
    label: 'Price',
    wrapper_class: 'col-6',
  })
  pricing: ProductPrice;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],

    type: 'text',
    label: 'Slug',
    wrapper_class: 'col-12',
    placeholder: '',

  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    type: 'ckeditor',
    label: 'Description',
    wrapper_class: 'col-12',
    placeholder: '',
  })
  description: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Track inventory',
    wrapper_class: 'col-6',
    value: false,
    placeholder: '',
  })
  track_inventory: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Quantity',
    inputType: 'number',
    wrapper_class: 'col-12',
    placeholder: '',
    conditional: {
      '==': [
        { var: 'track_inventory' },
        true
      ]
    }
  })
  quantity: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Shippable',
    wrapper_class: 'col-6',
    value: false,
    placeholder: '',
  })
  shippable: boolean

  @Attribute()
  @ExtraOptions({
    formType: FormArray,
    type: 'formGroup',

  })
  attributes: []

  @Attribute()
  @ExtraOptions({
    type: 'formGroup',
    label: 'SEO Title',
    wrapper_class: 'col-12',
  })
  seo_title: string

  @Attribute()
  @ExtraOptions({
    type: 'formGroup',
    label: 'SEO Description',
    wrapper_class: 'col-12',
  })
  seo_description: string

  @Attribute()
  quantity_allocated: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Cost',
    inputType: 'number',
    wrapper_class: 'col-12',
    placeholder: '',
  })
  cost: number;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

  public static smartTableOptions: SmartTableSettings = {
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


}
