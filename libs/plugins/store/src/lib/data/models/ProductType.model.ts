import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ProductTypeForm } from '../forms/ProductType.form';
import { ProductClasses } from '../interfaces/Product.interface';



@JsonApiModelConfig({
  type: 'ProductType',
  modelEndpointUrl: 'store/product-type',
})
export class ProductTypeModel extends AbstractModel {
  public static formClassRef = ProductTypeForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  attributes: any;

  @Attribute()
  product_class: ProductClasses;

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
  public toString = (): string => {
    return `${this.name}`;
  }

}
