import {Attribute, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';
import {ProductAttributeForm} from "../forms/ProductAttribute.form";
import {ProductAttributeTypeValues} from "../interfaces/Product.interface";
import {ProductAttributeOptionForm} from "../forms/ProductAttributeOption.form";


@JsonApiModelConfig({
  type: 'ProductAttributeOption',
  modelEndpointUrl: 'store/product-attribute',
})
export class ProductAttributeOptionModel extends AbstractModel {
  public static formClassRef = ProductAttributeOptionForm;
  public static include = null;

  @Attribute()
  label: string;

  @Attribute()
  value: string;

  permissions: PermissionModel[];

  get pk() {
    return null;
  }

  set pk(value) {

  }

  public toString = (): string => {
    return `${this.label}`;
  }

}
