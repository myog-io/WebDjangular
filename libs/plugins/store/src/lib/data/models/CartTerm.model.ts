import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';
import { AbstractModel } from '@core/data/src/lib/models';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { ProductModel } from './Product.model';
import { FormArray } from '@angular/forms';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';

@JsonApiModelConfig({
  type: 'CartTerm',
  modelEndpointUrl: 'store/cart-term'
})
export class CartTermModel extends AbstractModel {
  public static include = 'products';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Apply to All carts?',
    wrapper_class: 'col-4',
    value: true,
    placeholder: ''
  })
  all_carts: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Enabled?',
    wrapper_class: 'col-4',
    value: true,
    placeholder: ''
  })
  enabled: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Position',
    wrapper_class: 'col-4',
    value: 0,
    placeholder: ''
  })
  position: number;

  @Attribute()
  @ExtraOptions({
    type: 'codeEditor',
    label: 'Term Condition',
    element_class: 'small',
    wrapper_class: 'col-12',
    placeholder: ''
  })
  content: string;

  @HasMany()
  @ExtraOptions({
    type: 'checkbox',
    formType: FormArray,
    label: 'Products',
    model: ProductModel,
    conditional: {
      '!=': [{ var: 'all_carts' }, true]
    }
  })
  products: ProductModel;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) { }

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      content: {
        title: 'Content',
        type: 'html'
      },
      position: {
        title: 'Position Number',
        type: 'text'
      },
      created: {
        title: 'Created',
        type: 'text'
      }
    }
  };
}
