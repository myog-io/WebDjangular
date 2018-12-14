import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ExtraOptions } from '@webdjangular/core/decorator';


@JsonApiModelConfig({
  type: 'ProductAttributeOption',
  modelEndpointUrl: 'store/product-attribute',
})
export class ProductAttributeOptionModel extends AbstractModel {
  public static include = null;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Label',
  })
  label: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Value',
  })
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
