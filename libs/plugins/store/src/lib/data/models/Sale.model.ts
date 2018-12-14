import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { SaleForm } from '../forms/Sale.form';
import {FormControl, Validators} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";

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
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Type',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  type: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
      label: 'Start Date/Time',
      wrapper_class: 'col-6',
      placeholder: '',
  })
  start: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'End Date/Time',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  end: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Is active',
    wrapper_class: 'col-3',
    value: true,
  })
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

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      type: {
        title: 'Type',
        type: 'text',
      },
      name: {
        title: 'Name',
        type: 'text',
      },
      value: {
        title: 'Value',
        type: 'text',
      },
      is_active: {
        title: 'Active',
        type: 'text',
      },
      start: {
        title: 'Start Date/Time:',
        type: 'text',
      },
      end: {
        title: 'End Date/Time',
        type: 'text',
      }
    }
  }

}
