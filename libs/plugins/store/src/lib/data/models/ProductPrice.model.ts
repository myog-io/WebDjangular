import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { Validators } from '@angular/forms';


@JsonApiModelConfig({
  type: 'ProductPrice',
  modelEndpointUrl: 'store/product-price',
})
export class ProductPriceModel extends AbstractModel {
  public static include = null;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'List Price',
    inputType: 'number',
    wrapper_class: 'col-6',
  })
  list: number;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Sale Price',
    inputType: 'number',
    wrapper_class: 'col-6',
  })
  sale: number;

  get pk() {
    return null;
  }

  set pk(value) {

  }



}
