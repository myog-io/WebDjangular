import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';
import { Validators } from "@angular/forms";
import { DiscountTypeOptions } from '../interfaces/Discount.interface';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

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
    label: 'Rule Type',
    wrapper_class: 'col-6',
    placeholder: '',
    options: DiscountTypeOptions
  })
  rule_type: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Code(Voucher)',
    wrapper_class: 'col-4',
    placeholder: '',
  })
  voucher: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'switch',
    label: 'Require Code(Voucher)?',
    wrapper_class: 'col-2',
  })
  require_voucher: boolean;
  

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
    label: 'Value',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  value: string;

  @Attribute()
  @ExtraOptions({
    type: 'jsonLogic',
    label: 'Apply Rule only if all conditions are true',
    json_logic_options_url: '/api/store/discount/cart-rule/discount_options/'
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
