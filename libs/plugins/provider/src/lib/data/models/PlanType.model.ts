import { Attribute, HasMany, JsonApiModelConfig } from 'angular2-jsonapi';
import { FormArray, Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { ProductModel } from '@plugins/store/src/lib/data/models/Product.model';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'PlanType',
  modelEndpointUrl: 'provider/plan-type'
})
export class PlanTypeModel extends AbstractModel {
  public static include = 'products';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Is for Condos?',
    wrapper_class: 'col-4',
    value: true,
    placeholder: ''
  })
  is_condo: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Is for Companies?',
    wrapper_class: 'col-4',
    value: true,
    placeholder: ''
  })
  is_business: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Position',
    wrapper_class: 'col-4',
    value: 0,
    placeholder: ''
  })
  position: number;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    type: 'checkbox',
    label: 'Products',
    options: { product_class_neq: 'addon' },
    model: ProductModel
  })
  products: ProductModel;

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text'
      },
      is_condo: {
        title: 'Is Condo?',
        type: 'text'
      },
      is_business: {
        title: 'Is Business',
        type: 'text',
        filter: 'groups_in'
      },
      position: {
        title: 'Position',
        type: 'text'
      }
    }
  };
}
