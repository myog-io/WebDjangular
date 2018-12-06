import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { ProductForm } from '../forms/Product.form';
import {FormControl, Validators} from "@angular/forms";


export interface ProductPrice {
  list: string;
  sale?: string;

}

@JsonApiModelConfig({
  type: 'Product',
  modelEndpointUrl: 'store/product',
})
export class ProductModel extends AbstractModel {
  public static formClassRef = ProductForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  sku: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute()
  pricing: ProductPrice;

  @Attribute()
  slug: string;

  @Attribute()
  description: string;

  @Attribute()
  track_inventory: string;

  @Attribute()
  quantity: string;

  @Attribute()
  quantity_allocated: string;

  @Attribute()
  cost: string;

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
