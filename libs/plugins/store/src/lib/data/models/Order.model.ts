import {JsonApiModelConfig, Attribute, HasMany, BelongsTo, NestedAttribute} from 'angular2-jsonapi';
import {AbstractModel, CoreConfigInputModel} from '@core/data/src/lib/models';
import {PermissionModel, UserModel} from '@core/users/src/lib/models';
import {SmartTableColumnSettings, SmartTableSettings, SmartTableSettingsAttr} from '@core/data/src/lib/data-store';
import {ExtraOptions} from "@core/decorator/src/lib/ExtraOptions.decorator";
import {FormGroup} from "@angular/forms";
import {BlockFooterModel} from "@core/cms/src/lib/models/BlockFooter.model";
import {OrderLineModel} from "@plugins/store/src/lib/data/models/OrderLine.model";
import {OrderEventModel} from "@plugins/store/src/lib/data/models/OrderEvent.model";


@JsonApiModelConfig({
  type: 'Order',
  modelEndpointUrl: 'store/order',
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
  extra_data: object;

  @NestedAttribute()
  security_data: object;

  @NestedAttribute()
  extra_payment_data: object;

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

  set pk(value) {

  }

  public static smartTableOptions: SmartTableSettings = {
    editable: false,
    columns: {
      order_num: {
        title: 'Order number',
        type: 'text',
      },
      status: {
        title: 'Status',
        type: 'text',
      },
      created: {
        title: 'Created',
        type: 'text',
      }
    },
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: 'left',
      /*custom:[
        {
          name: 'view',
          title: '<i class="far fa-eye"></i>'
        }
      ], */
    }
  };

}
