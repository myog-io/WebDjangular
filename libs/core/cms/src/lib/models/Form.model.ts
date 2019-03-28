import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';
import { Validators, FormArray, FormGroup } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { FormFieldModel } from './FormField.model';
import { FormActionModel } from './FormAction.model';
import { AbstractForm } from '@core/data/src/lib/forms';
import { BuilderFormValidatorMessages } from '@core/builder/src/lib/interfaces/form-config.interface';
import { WDAValidators } from '@core/builder/src/lib/inputs/validators/custom.validators';

@JsonApiModelConfig({
  type: 'Form',
  modelEndpointUrl: 'cms/form'
})
export class FormModel extends AbstractModel {
  public static include = 'fields,actions';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Form Title',
    wrapper_class: 'col-6'
  })
  title: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, WDAValidators.slug],
    type: 'text',
    label: 'Code',
    wrapper_class: 'col-6'
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Show Title',
    wrapper_class: 'col-4',
    value: true
  })
  show_title: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Clear Form on Complete',
    wrapper_class: 'col-4',
    value: true
  })
  clear_complete: boolean;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Hide Form on Complete',
    wrapper_class: 'col-4',
    value: true
  })
  hide_complete: boolean;

  @HasMany()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Fields',
    model: FormFieldModel
  })
  fields: FormFieldModel[];

  @HasMany()
  @ExtraOptions({
    type: 'formArray',
    formType: FormArray,
    label: 'Actions',
    model: FormActionModel
  })
  actions: FormActionModel[];

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Mensagem Enviada com sucesso!',
    wrapper_class: 'col-6'
  })
  success_message: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Ocorreu um erro ao enviar sua mensagem, por favor tente novamente!',
    wrapper_class: 'col-6'
  })
  error_message: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: '{label} é obrigatorio',
    wrapper_class: 'col-6'
  })
  error_required: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Endereço de Email invalido!',
    wrapper_class: 'col-6'
  })
  error_email: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Data invalida!',
    wrapper_class: 'col-6'
  })
  error_date: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Estes campos devem ser iguais!',
    wrapper_class: 'col-6'
  })
  error_match: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: '{label} deve ter no minimo {min} letras',
    wrapper_class: 'col-6'
  })
  error_min_length: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: '{label} deve ter no maximo {max} letras',
    wrapper_class: 'col-6'
  })
  error_max_length: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Por favor, corrija os erros antes de enviar o formulário.',
    wrapper_class: 'col-6'
  })
  error_validation: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'error_honeypot',
    wrapper_class: 'col-6'
  })
  error_honeypot: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: '{label} invalido',
    wrapper_class: 'col-6'
  })
  error_invalid: string;

  public getFormGroup(): FormGroup {
    const fg = new AbstractForm(this.service);
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      field.generateConfig();
      fg.registerControl(field.slug, field.formControl);
    }
    return fg;
  }
  public getValidatorMessages(): BuilderFormValidatorMessages {
    return {
      error_required: this.error_required || undefined,
      error_email: this.error_email || undefined,
      error_date: this.error_date || undefined,
      error_match: this.error_match || undefined,
      error_min_length: this.error_min_length || undefined,
      error_max_length: this.error_max_length || undefined,
      error_invalid: this.error_invalid || undefined,
      error_honeypot: this.error_honeypot || undefined
    };
  }
  public toString = (): string => {
    return `${this.title} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'text'
      },
      title: {
        title: 'Title',
        type: 'text'
      },
      slug: {
        title: 'Form Code',
        type: 'text'
      }
    }
  };
}
