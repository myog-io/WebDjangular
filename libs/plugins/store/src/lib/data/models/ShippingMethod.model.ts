import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { ShippingMethodForm } from '../forms/ShippingMethod.form';
import {FormControl, Validators} from "@angular/forms";

@JsonApiModelConfig({
  type: 'ShippingMethod',
  modelEndpointUrl: 'store/shipping-method',
})
export class ShippingMethodModel extends AbstractModel {
  public static formClassRef = ShippingMethodForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  price: string;

  @Attribute()
  minimum_order_price: string;

  @Attribute()
  maximum_order_price: string;

  @Attribute()
  minimum_order_weight: number;

  @Attribute()
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

}
