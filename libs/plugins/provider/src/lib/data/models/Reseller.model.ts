import { JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'Reseller',
  modelEndpointUrl: 'provider/reseller'
})
export class ResellerModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    inputType: 'text',
    label: 'Name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.email],
    type: 'text',
    inputType: 'email',
    label: 'Email'
  })
  email: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: "Is Activate?",
    value: true,
  })
  active: string;

  @Attribute()
  order_count: number

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text'
      },
      email: {
        title: 'Email',
        type: 'text'
      },
      active: {
        title: "Is Active?",
        type: 'text'
      },
      order_count: {
        title: "Order Count",
        type: 'text'
      }
    }
  };
}
