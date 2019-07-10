import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo,
  NestedAttribute
} from 'angular2-jsonapi';
import { AbstractModel } from '@core/data/src/lib/models';
import { PermissionModel, UserModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

import { OrderLineModel } from '@plugins/store/src/lib/data/models/OrderLine.model';
import { OrderEventModel } from '@plugins/store/src/lib/data/models/OrderEvent.model';

@JsonApiModelConfig({
  type: 'Order',
  modelEndpointUrl: 'store/order'
})
export class OrderModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  order_num: string;

  @Attribute()
  status: string;

  @BelongsTo()
  user: UserModel;

  @Attribute()
  user_email: string;

  @NestedAttribute()
  extra_data: any;

  @NestedAttribute()
  security_data: any;

  @NestedAttribute()
  extra_payment_data: any;

  @NestedAttribute()
  billing_address: object;

  @NestedAttribute()
  shipping_address: object;

  @NestedAttribute()
  terms: object;

  @Attribute()
  shipping_price: number;

  @Attribute()
  taxes: number;

  @Attribute()
  subtotal: number;

  @Attribute()
  total: number;

  @Attribute()
  discount: number;

  @Attribute()
  customer_note: string;

  @HasMany()
  lines: OrderLineModel[];

  @HasMany()
  events: OrderEventModel[];

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
    editable: false,
    columns: {
      order_num: {
        title: 'Order number',
        type: 'text'
      },
      billing_address: {
        title: 'Name',
        type: 'text',
        valuePrepareFunction: (cell: any, row: any) => {
          if (cell.company_name) {
            return `${cell.first_name} ${cell.last_name} - ${cell.company_name}`;
          }
          return `${cell.first_name} ${cell.last_name}`;
        }
      },

      status: {
        title: 'Status',
        type: 'text'
      },
      created: {
        title: 'Created',
        type: 'text'
      }
    },
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: 'left'
      /*custom:[
        {
          name: 'view',
          title: '<i class="far fa-eye"></i>'
        }
      ], */
    }
  };
}
