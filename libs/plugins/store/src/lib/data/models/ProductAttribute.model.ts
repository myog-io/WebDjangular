import {Attribute, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';
import {ProductAttributeForm} from "../forms/ProductAttribute.form";
import {ProductAttributeTypeValues} from "../interfaces/Product.interface";


@JsonApiModelConfig({
  type: 'ProductAttribute',
  modelEndpointUrl: 'store/product-type',
})
export class ProductAttributeModel extends AbstractModel {
  public static formClassRef = ProductAttributeForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  code: string;

  @Attribute()
  name: string;

  @Attribute()
  required: boolean;

  @Attribute()
  type: ProductAttributeTypeValues;

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
    return `${this.name} (ID: ${this.id})`;
  }

}
