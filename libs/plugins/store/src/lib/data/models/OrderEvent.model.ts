import {JsonApiModelConfig, Attribute, HasMany, BelongsTo, NestedAttribute} from 'angular2-jsonapi';
import { AbstractModel } from '@core/data/src/lib/models';
import {PermissionModel, UserModel} from '@core/users/src/lib/models';
import {SmartTableColumnSettings, SmartTableSettings, SmartTableSettingsAttr} from '@core/data/src/lib/data-store';
import { OrderEventTypes } from '../interfaces/Order.interface'
import {OrderModel} from "@plugins/store/src/lib/data/models/Order.model";

@JsonApiModelConfig({
  type: 'OrderEvent',
  modelEndpointUrl: 'store/order',
})
export class OrderEventModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  event_type: OrderEventTypes;

  @NestedAttribute()
  data: string;

  @BelongsTo()
  user: UserModel;

  @BelongsTo()
  order: OrderModel;

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
}
