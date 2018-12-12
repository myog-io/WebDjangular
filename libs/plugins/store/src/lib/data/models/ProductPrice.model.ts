import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';

import { ProductPriceForm } from '../forms/ProductPrice.form';

@JsonApiModelConfig({
  type: 'ProductPrice',
  modelEndpointUrl: 'store/product-price',
})
export class ProductPriceModel extends AbstractModel {
  public static formClassRef = ProductPriceForm;
  public static include = null;

  @Attribute()
  list: number;

  @Attribute()
  sale: string;

  get pk() {
    return null;
  }

  set pk(value) {

  }

}
