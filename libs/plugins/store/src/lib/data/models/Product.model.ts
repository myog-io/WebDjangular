import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';

import {ProductClasses} from '../interfaces/Product.interface';
import {ProductTypeModel} from './ProductType.model';
import {SmartTableSettings} from '@webdjangular/core/data';
import {ExtraOptions} from '@webdjangular/core/decorator';
import {FormGroup, Validators} from '@angular/forms';

enum productDG {
  type = 'product-type',
  attributes = 'attributes',
  inventory = 'inventory',
  shipping = 'shipping',
  general = 'general-information',
  pricing = 'pricing',
  media = 'media',
  addons = 'addons'
}

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
    label: 'select',
    display: false,
    conditionalValue: {var: 'product_type.product_class'},
    displayGroup: productDG.general
  })
  product_class: ProductClasses;

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
    displayGroup: productDG.general,
    conditionalValue: {"slugfy": [{"var": "sku"}]},

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
    type: 'text',
    label: 'List',
    wrapper_class: 'col-6',
    displayGroup: productDG.pricing
  })
  pricing_list: string;


  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Sale',
    wrapper_class: 'col-6',
    displayGroup: productDG.pricing
  })
  pricing_sale: string;

  @Attribute()
  @ExtraOptions({
    type: 'codeEditor',
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
    conditional: {
      '==': [
        {var: 'track_inventory'},
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
    wrapper_class: 'col-12',
    value: false,
    placeholder: '',
    displayGroup: productDG.shipping
  })
  shippable: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Weight',
    inputType: 'text',
    wrapper_class: 'col-3',
    conditional: {
      '==': [
        {var: 'shippable'},
        true
      ]
    },
    displayGroup: productDG.shipping
  })
  weight: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Width',
    inputType: 'text',
    wrapper_class: 'col-3',
    conditional: {
      '==': [
        {var: 'shippable'},
        true
      ]
    },
    displayGroup: productDG.shipping
  })
  shipping_width: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Height',
    inputType: 'text',
    wrapper_class: 'col-3',
    conditional: {
      '==': [
        {var: 'shippable'},
        true
      ]
    },
    displayGroup: productDG.shipping
  })
  shipping_height: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Depth',
    inputType: 'text',
    wrapper_class: 'col-3',
    conditional: {
      '==': [
        {var: 'shippable'},
        true
      ]
    },
    displayGroup: productDG.shipping
  })
  shipping_depth: string;


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
  @ExtraOptions({
    type: 'text',
    label: 'Cost',
    inputType: 'number',
    wrapper_class: 'col-6',
    placeholder: '',
    displayGroup: productDG.addons
  })
  addons: ProductModel[];








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
          {var: 'product_type.id'},
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
          name: productDG.media,
          title: 'Images / Videos',
        }
      ],
      conditional: {
        '==': [
          {var: 'product_type.id'},
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
        '==': [
          {var: 'product_type.id'},
          null
        ]
      },
    },
    {
      wrapper_class: 'col-12',
      groups: [
        {
          name: productDG.addons,
          title: 'Add-ons',
        },
      ],
      conditional: {
        '==': [
          {var: 'product_type.id'},
          null
        ]
      },
    }
  ];

  public toString = (): string => {
    return `${this.name} (${this.pricing.list})`;
  };

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
      product_type: {
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
