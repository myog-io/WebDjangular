import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';
import {Validators} from "@angular/forms";
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';



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
