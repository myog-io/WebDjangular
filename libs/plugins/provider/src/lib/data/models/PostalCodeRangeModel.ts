import { Attribute, BelongsTo, JsonApiModelConfig } from 'angular2-jsonapi';
import { Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'PostalCodeRange',
  modelEndpointUrl: 'provider/postal-code-range'
})
export class PostalCodeRangeModel extends AbstractModel {
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Start',
    wrapper_class: 'col-6',
    placeholder: 'Enter where the Postal Code range begins'
  })
  start: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'End',
    wrapper_class: 'col-6',
    placeholder: 'Enter where the Postal Code range ends'
  })
  end: string;

  @BelongsTo()
  @ExtraOptions({
    type: 'hidden'
  })
  city: number;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}

  public toString = (): string => {
    return `${this.name} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      start: {
        title: 'start',
        type: 'text'
      },
      end: {
        title: 'end',
        type: 'text'
      }
    }
  };
}
