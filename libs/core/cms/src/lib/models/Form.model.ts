import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Validators, FormArray, FormGroup } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { FormFieldModel } from './FormField.model';
import { FormActionModel } from './FormAction.model';


@JsonApiModelConfig({
  type: 'Form',
  modelEndpointUrl: 'cms/form',
})
export class FormModel extends AbstractModel {
  public include = 'fields,actions';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Form Title',
    wrapper_class: 'col-6',
  })
  title: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-6',
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Show Title',
    wrapper_class: 'col-4',
    value: true,
  })
  show_title: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Clear Form on Complete',
    wrapper_class: 'col-4',
    value: true,
  })
  clear_complete: boolean

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Hide Form on Complete',
    wrapper_class: 'col-4',
    value: true,
  })
  hide_complete: boolean

  @HasMany()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Fields',
    model: FormFieldModel,
  })
  fields: FormFieldModel[]

  @HasMany()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Actions',
    model: FormActionModel,
  })
  actions: FormActionModel[]

  public getFormGroup():FormGroup {
    const fg = new FormGroup({})
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      field.generateConfig();
      fg.registerControl(field.code,field.formControl);  
    }
    return fg;
  }

  public toString = (): string => {
    return `${this.title} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'text',
      },
      title: {
        title: 'Title',
        type: 'text',
      },
      slug: {
        title: 'Form Code',
        type: 'text',
      },
    },
  };

}