import { Attribute, BelongsTo, JsonApiModelConfig } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';

import { ProductClasses, ProductPrice } from '../interfaces/Product.interface';
import { ProductTypeModel } from './ProductType.model';
import { SmartTableSettings } from '@webdjangular/core/data';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { Validators, FormArray, FormGroup } from '@angular/forms';
import { ProductPriceModel } from './ProductPrice.model';
enum productDG {
  type = 'product-type',
  attributes = 'attributes',
  inventory = 'inventory',
  shipping = 'shipping',
  general = 'general-information',
  pricing = 'pricing',
  seo = 'seo',
  media = 'media',
}
@JsonApiModelConfig({
  type: 'Product',
  modelEndpointUrl: 'store/product',
})
export class ProductModel extends AbstractModel {
  public static include = 'product_type';

  @Attribute()
  id: string;



  @BelongsTo()
  @ExtraOptions({
    validators: [Validators.required],
    model: ProductTypeModel,
    formType: FormGroup,
    type: 'select',
    label: 'Type',
    wrapper_class: 'col-12',
    placeholder: 'Select the Product Type',
    //value: null,
    options_model: ProductTypeModel,
    displayGroup: productDG.type
  })
  product_type: ProductTypeModel;


  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'SKU',
    wrapper_class: 'col-12',
    placeholder: '',
    displayGroup: productDG.general
  })
  sku: string;


  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-12',
    placeholder: '',
    displayGroup: productDG.general
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'hidden',
  })
  product_class: ProductClasses;

  @Attribute()
  @ExtraOptions({
    formType: FormGroup,
    validators: [Validators.required],
    model: ProductPriceModel,
    type: 'formGroup',
    label: 'Price',
    wrapper_class: 'col-12',
    displayGroup: productDG.pricing
  })
  pricing: ProductPrice;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],

    type: 'text',
    label: 'Slug',
    wrapper_class: 'col-12',
    placeholder: '',
    displayGroup: productDG.general

  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    type: 'ckeditor',
    label: 'Description',
    wrapper_class: 'col-12',
    placeholder: '',
    displayGroup: productDG.general
  })
  description: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Track inventory',
    wrapper_class: 'col-6',
    value: false,
    placeholder: '',
    displayGroup: productDG.inventory
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
    },
    displayGroup: productDG.inventory
  })
  quantity: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Shippable',
    wrapper_class: 'col-6',
    value: false,
    placeholder: '',
    displayGroup: productDG.shipping
  })
  shippable: boolean

  @Attribute()
  @ExtraOptions({
    formType: FormGroup,
    type: 'formGroup',
    displayGroup: productDG.attributes,
    copyOptions: {
      name:'product_type',
      field:'attributes',
    }
  })
  attributes: [];

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'SEO Title',
    wrapper_class: 'col-12',
    displayGroup: productDG.seo
  })
  seo_title: string

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'SEO Description',
    wrapper_class: 'col-12',
    displayGroup: productDG.seo
  })
  seo_description: string;

  @Attribute()
  quantity_allocated: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Cost',
    inputType: 'number',
    wrapper_class: 'col-12',
    placeholder: '',
    displayGroup: productDG.pricing
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
  public displayGroups = [
    {
      wrapper_class: 'col-6 offset-3',
      groups: [
        {
          name: productDG.type,
          title: 'Product Type',
        }
      ],
      conditional: {
        '==': [
          { var: 'product_type.id' },
          null
        ]
      },
    },
    {
      wrapper_class: 'col-8',
      groups: [
        {
          name: productDG.general,
          title: 'General information',
        },
        {
          name: productDG.pricing,
          title: 'Pricing',
        },
        {
          name: productDG.seo,
          title: 'SEO',
        },
        {
          name: productDG.media,
          title: 'Images / Videos',
        }
      ],
      conditional: {
        '!=': [
          { var: 'product_type.id' },
          null
        ]
      },
    },
    {
      wrapper_class: 'col-4',
      groups: [
        {
          name: productDG.shipping,
          title: 'Shipping',
        },
        {
          name: productDG.inventory,
          title: 'Inventory',
        },
        {
          name: productDG.attributes,
          title: 'Attributes',
        },
      ],
      conditional: {
        '!=': [
          { var: 'product_type.id' },
          null
        ]
      },
    }
  ]

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
