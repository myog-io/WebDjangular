import {Attribute, BelongsTo, JsonApiModelConfig, NestedAttribute} from 'angular2-jsonapi';
import {AbstractModel, AddressModel} from '@core/data/src/lib/models';
import {PermissionModel, UserModel} from '@core/users/src/lib/models';
import {ProductModel} from "@plugins/store/src/lib/data/models/Product.model";
import {CartModel} from "@plugins/store/src/lib/data/models/Cart.model";

@JsonApiModelConfig({
  type: 'CartItem',
  modelEndpointUrl: 'store/cart-item',
})
export class CartItemModel extends AbstractModel {
  public static include = 'cart,product';

  @Attribute()
  id: string;

  @BelongsTo()
  cart: CartModel;

  @BelongsTo()
  product: ProductModel;

  @Attribute()
  quantity: number;

  @NestedAttribute()
  data: any;

  @Attribute()
  base_price: number;

  @Attribute()
  price: number;

  @Attribute()
  discount: number;

  @Attribute()
  total: number;

  @Attribute()
  is_shipping_required: boolean;

  @Attribute()
  name: string;

  @Attribute()
  sku: string;
  
  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  
  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

  public toString = (): string => {
    return `${this.id}`;
  };


}
