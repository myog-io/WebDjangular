import {Attribute, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';
import {ProductAttributeTypeValues, ProductClasses} from "../interfaces/Product.interface";
import {ProductAttributeOptionModel} from "./ProductAttributeOption.model";
import {ExtraOptions} from "@webdjangular/core/decorator";
import {Validators} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";
import {RangeInterface} from "@webdjangular/plugins/provider-data";

export interface ProductAttributeInterface {
  name: string;
  code?: string;
  required: boolean;
  type: string;
  options: any;
}
@JsonApiModelConfig({
  type: 'ProductAttribute',
  modelEndpointUrl: 'store/product-attribute',
})
export class ProductAttributeModel extends AbstractModel {
  public static include = null;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Attribute Name',
    wrapper_class: 'col-6',
    placeholder: 'Enter the attribute name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-6',
    placeholder: 'Enter the attribute internal code'
  })
  code: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'switch',
    label: 'Is required?',
    wrapper_class: 'col-5'
  })
  required: boolean;

  @Attribute()
  type: ProductAttributeTypeValues[];

  @Attribute()
  options: ProductAttributeOptionModel[];

  permissions: PermissionModel[];

  get pk() {
    return null;
  }

  set pk(value) {

  }

  public toString = (): string => {
    return `${this.name} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      code: {
        title: 'Code',
        type: 'text',
      }
    }
  };

}
