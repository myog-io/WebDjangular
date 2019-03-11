import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { FormModel } from './Form.model';


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
