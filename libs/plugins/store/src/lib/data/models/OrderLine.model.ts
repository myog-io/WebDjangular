import {Attribute, BelongsTo, JsonApiModelConfig, NestedAttribute} from 'angular2-jsonapi';
import {AbstractModel} from '@core/data/src/lib/models';
import {OrderModel} from "@plugins/store/src/lib/data/models/Order.model";
import {ProductModel} from "@plugins/store/src/lib/data/models/Product.model";


@JsonApiModelConfig({
  type: 'OrderLine',
  modelEndpointUrl: 'store/order-line',
})
export class OrderLineModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  product_name: string;

  @Attribute()
  product_sku: string;

  @Attribute()
  is_shipping_required: boolean;

  @Attribute()
  quantity: number;

  @Attribute()
  quantity_fulfilled: number;

  @Attribute()
  unit_cost: number;

  @Attribute()
  unit_base_price: number;

  @Attribute()
  unit_price: number;

  @Attribute()
  tax_rate: number;

  @BelongsTo()
  order: OrderModel;

  @BelongsTo()
  product: ProductModel;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;


  get pk() {
    return this.id;
  }

  set pk(value) {

  }

  getTotal() {
    return this.unit_price * this.quantity
  }
}