import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { VoucherForm } from '../forms/Voucher.form';
import {FormControl, Validators} from "@angular/forms";

@JsonApiModelConfig({
  type: 'Voucher',
  modelEndpointUrl: 'store/voucher',
})
export class VoucherModel extends AbstractModel {
  public static formClassRef = VoucherForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute()
  code: string;

  @Attribute()
  usage_limit: string;

  @Attribute()
  used: number;

  @Attribute()
  start: string;

  @Attribute()
  end: string;

  @Attribute()
  apply_once_per_order: string;

  @Attribute()
  discount_value_type: string;

  @Attribute()
  discount_value: string;

  @Attribute()
  min_amount_spent: string;

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
