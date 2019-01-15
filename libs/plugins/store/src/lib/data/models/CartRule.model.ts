import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';
import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { Validators } from "@angular/forms";
import { SmartTableSettings } from "@webdjangular/core/data";
import { DiscountTypeOptions } from '../interfaces/Discount.interface';

@JsonApiModelConfig({
  type: 'CartRule',
  modelEndpointUrl: 'store/discount/cart-rule',
})
export class CartRuleModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

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
    type: 'select',
    label: 'Discount Type',
    wrapper_class: 'col-6',
    placeholder: '',
    options: DiscountTypeOptions
  })
  rule_type: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  voucher: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    inputType: 'number',
    label: 'Usage limit (0 for empty)',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  usage_limit: string;

  @Attribute()
  used: number;

  @Attribute()
  @ExtraOptions({
    type: 'datepicker',
    inputType: 'datetime-local',
    label: 'Start Date/Time',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  start: Date;

  @Attribute()
  @ExtraOptions({
    type: 'datepicker',
    inputType: 'datetime-local',
    label: 'End Date/Time',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  end: Date;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Apply once per order',
    wrapper_class: 'col-6',
    placeholder: '',
    value: false,
  })
  apply_once_per_order: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Discount value',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  value: string;

  @Attribute()
  @ExtraOptions({
    type: 'jsonLogic',
    label: 'Apply Rule only if all conditions are true',
  })
  conditions: any;

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
      code: {
        title: 'Code',
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
    },
  };

}
