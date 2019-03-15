import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { FormModel } from './Form.model';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';


@JsonApiModelConfig({
  type: 'FormSubmitted',
  modelEndpointUrl: 'cms/form-submit',
})
export class FormSubmittedModel extends AbstractModel {
  @Attribute()
  id: string;

  @BelongsTo()
  form: FormModel;

  @Attribute()
  @ExtraOptions({
    type: 'codeEditor',
    label: 'Sent Data',
    element_class: 'small',
    options: {
      language: 'json'
    }
  })
  data: any;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;


  public toString = (): string => {
    return `${this.id}(${this.form})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: 'Name',
        type: 'text',
      },
      form: {
        title: 'Code',
        type: 'text',
      },
      created: {
        title: 'Created',
        type: 'text',
      },

    },
  };
}
