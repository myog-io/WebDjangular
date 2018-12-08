import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { SaleForm } from '../forms/Sale.form';
import {FormControl, Validators} from "@angular/forms";

@JsonApiModelConfig({
  type: 'Voucher',
  modelEndpointUrl: 'store/voucher',
})
export class SaleModel extends AbstractModel {
  public static formClassRef = SaleForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  type: string;

  @Attribute()
  name: string;

  @Attribute()
  start: string;

  @Attribute()
  end: string;

  @Attribute()
  is_active: boolean;

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
