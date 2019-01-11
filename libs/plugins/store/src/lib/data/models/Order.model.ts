import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import {SmartTableSettings} from "@webdjangular/core/data";

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

  @Attribute()
  user_email: string;

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
  };

}
