import {Attribute, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';


import {ExtraOptions} from '@webdjangular/core/decorator';
import {Validators} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";

@JsonApiModelConfig({
  type: 'ShippingMethod',
  modelEndpointUrl: 'store/shipping-method',
})
export class ShippingMethodModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Type',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  type: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Price',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  price: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Minimum order price',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  minimum_order_price: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Maximum order price',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  maximum_order_price: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Minimum order weight',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  minimum_order_weight: number;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Maximum order weight',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  maximum_order_weight: string;

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
      type: {
        title: 'Type',
        type: 'text',
      },
      name: {
        title: 'Name',
        type: 'text',
      },
      price: {
        title: 'Price',
        type: 'text',
      },
      minimum_order_price: {
        title: 'Minimum order price',
        type: 'text',
      },
      maximum_order_price: {
        title: 'Maximum order price',
        type: 'text',
      },

      minimum_order_weight: {
        title: 'Minimum order weight',
        type: 'text',
      },
      maximum_order_weight: {
        title: 'Maximum order weight',
        type: 'text',
      }
    }
  };
}
