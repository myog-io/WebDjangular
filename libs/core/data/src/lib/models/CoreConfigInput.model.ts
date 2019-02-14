import {
  JsonApiModelConfig,
  Attribute,
  BelongsTo,
  NestedAttribute,

} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { CoreConfigModel } from './CoreConfig.model';
import { PermissionModel } from '@core/users/src/lib/models';
import { BuilderFormFieldConfig } from '@core/builder/src/lib/interfaces/form-config.interface';

@JsonApiModelConfig({
  type: 'core_config_input'
})
export class CoreConfigInputModel extends AbstractModel {
  @Attribute()
  id: string;

  @Attribute()
  field_type: string;

  @Attribute()
  input_type: string;

  @Attribute()
  order: number;

  @Attribute()
  disabled: boolean;

  @Attribute()
  label: string;

  @NestedAttribute()
  options: any;

  @NestedAttribute()
  select_model: any;

  @Attribute()
  placeholder: string;

  @NestedAttribute()
  validation: any;

  @Attribute()
  wrapper_class: string;

  @Attribute()
  group: string;

  @Attribute()
  value: any;

  @Attribute()
  add_tags: boolean;

  @NestedAttribute()
  conditional: any;

  @BelongsTo()
  core_config: CoreConfigModel

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}

  get fieldConfig() : BuilderFormFieldConfig {
    return {
      disabled: this.disabled,
      label: this.label,
      name: this.id,
      options: this.options,
      model: this.select_model,
      placeholder: this.placeholder,
      type: this.field_type,
      validation: this.validation,
      value: this.value,
      wrapper_class: this.wrapper_class,
      inputType: this.input_type,
      display: true,
      conditional: this.conditional,
      multiple: this.input_type === 'multiple',
      addTags: this.add_tags,
    };
  }
}
