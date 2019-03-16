import {
  Attribute,
  BelongsTo,
  JsonApiModelConfig,
  NestedAttribute
} from 'angular2-jsonapi';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { Validators } from '@angular/forms';

export const ActionChoices = [{ id: 'send_email', name: 'Enviar email' }];

@JsonApiModelConfig({
  type: 'FormAction',
  modelEndpointUrl: 'cms/form-action'
})
export class FormActionModel extends AbstractModel {
  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Label'
  })
  label: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Code'
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    inputType: 'number',
    label: 'Position'
  })
  position: number;

  @Attribute()
  @ExtraOptions({
    type: 'ngSelect',
    label: 'Action Type',
    options: ActionChoices
  })
  action_type: string;

  @NestedAttribute()
  @ExtraOptions({
    type: 'codeEditor',
    label: 'Extra Data',
    element_class: 'small',
    options: {
      language: 'json'
    }
  })
  data: any;

  @BelongsTo()
  form: any;

  public toString = (): string => {
    return `${this.label} (${this.action_type})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      label: {
        title: 'Name',
        type: 'text'
      },
      action_type: {
        title: 'Action Type',
        type: 'text'
      }
    }
  };
}
