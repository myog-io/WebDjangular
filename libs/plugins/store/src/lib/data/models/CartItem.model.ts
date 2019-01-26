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
  id: string = null;

  @BelongsTo()
  cart: CartModel = null;

  @BelongsTo()
  product: ProductModel = null;

  @Attribute()
  quantity: number = 1;

  @NestedAttribute()
  data: object = {};

  @Attribute()
  created: Date = null;

  @Attribute()
  updated: Date = null;

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
