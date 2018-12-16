import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ExtraOptions } from '@webdjangular/core/decorator';
import {SmartTableSettings} from "@webdjangular/core/data";
import {Validators} from "@angular/forms";


@JsonApiModelConfig({
  type: 'ProductAttributeOption',
  modelEndpointUrl: 'store/product-attribute',
})
export class ProductAttributeOptionModel extends AbstractModel {
  public static include = null;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Label',
    wrapper_class: 'col-6',
    placeholder: 'Enter the attribute name'
  })
  label: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Value',
    wrapper_class: 'col-6',
    placeholder: 'Enter the value'
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
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      label: {
        title: 'Label',
        type: 'text',
      },
      value: {
        title: 'Value',
        type: 'text',
      }
    }
  };

}
