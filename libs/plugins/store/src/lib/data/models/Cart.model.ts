import {Attribute, BelongsTo, HasMany, JsonApiModelConfig, NestedAttribute} from 'angular2-jsonapi';
import {AbstractModel, AddressModel} from '@core/data/src/lib/models';
import {PermissionModel, UserModel} from '@core/users/src/lib/models';
import {CartItemModel} from "@plugins/store/src/lib/data/models/CartItem.model";
import {CartTermModel} from "@plugins/store/src/lib/data/models/CartTerm.model";

@JsonApiModelConfig({
  type: 'Cart',
  modelEndpointUrl: 'store/cart',
})
export class CartModel extends AbstractModel {
  public static include = 'billing_address,shipping_address';

  @Attribute()
  id: string;

  @BelongsTo()
  user: UserModel;

  @Attribute()
  token: string;

  @Attribute()
  total_quantity: number;

  @Attribute()
  status: string;

  @BelongsTo()
  billing_address: AddressModel;

  @BelongsTo()
  shipping_address: AddressModel;

  @NestedAttribute()
  extra_data: any;

  @HasMany()
  items: CartItemModel[];

  @Attribute()
  total: number;

  @Attribute()
  subtotal: number;

  @Attribute()
  fees: number;

  @Attribute()
  shipping_price: number;
  
  @Attribute()
  taxes: number;

  @HasMany()
  terms: CartTermModel[];

  @Attribute()
  is_shipping_required: boolean;

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
