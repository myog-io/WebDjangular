import { Attribute, JsonApiModelConfig } from 'angular2-jsonapi';
import { Validators } from "@angular/forms";
import { DiscountTypeOptions } from '../interfaces/Discount.interface';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'CatalogRule',
  modelEndpointUrl: 'store/discount/catalog-rule',
})
export class CatalogRuleModel extends AbstractModel {
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
    inputType: 'number',
    label: 'Discount Ammount',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  value: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'datepicker',
    inputType: 'datetime-local',
    label: 'Start Date/Time',
    wrapper_class: 'col-6',
    placeholder: '',
  })
  start: Date;

  @Attribute()
  @ExtraOptions({
    validators: [],
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
    label: 'Is active',
    wrapper_class: 'col-3',
    value: true,
  })
  is_active: boolean;

  @Attribute()
  @ExtraOptions({
    validators: [],
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

      name: {
        title: 'Name',
        type: 'text',
      },
      rule_type: {
        title: 'Type',
        type: 'text',
      },
      value: {
        title: 'Value',
        type: 'text',
      },
      is_active: {
        title: 'Active',
        type: 'text',
        valuePrepareFunction: (cell,row) => cell ? 'Yes':'No'
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
