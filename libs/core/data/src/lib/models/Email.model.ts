import { JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { AbstractModel } from './Abstract.model';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { Validators } from '@angular/forms';
import { SmartTableSettings } from '../data-store';
import { WDAValidators } from '@core/builder/src/lib/inputs/validators/custom.validators';

@JsonApiModelConfig({
  type: 'Email',
  modelEndpointUrl: 'core_email'
})
export class EmailModel extends AbstractModel {
  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Subject',
    wrapper_class: 'col-12',
    placeholder: 'Hi {{first_name}}'
  })
  subject: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, WDAValidators.slug],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Email Code'
  })
  code: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'codeEditor',
    label: 'Email Content',
    wrapper_class: 'col-12'
  })
  content: string;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  get pk() {
    return this.id;
  }

  set pk(value) { }

  public toString = (): string => {
    return `${this.code} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: '#',
        type: 'text'
      },
      subject: {
        title: 'Subject',
        type: 'text'
      },
      code: {
        title: 'Code',
        type: 'text'
      },
      created: {
        title: 'Created',
        type: 'text'
      }
    }
  };
}
