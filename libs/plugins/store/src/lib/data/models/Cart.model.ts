import {Attribute, BelongsTo, JsonApiModelConfig, NestedAttribute} from 'angular2-jsonapi';
import {AbstractModel, AddressModel} from '@core/data/src/lib/models';
import {PermissionModel, UserModel} from '@core/users/src/lib/models';

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
