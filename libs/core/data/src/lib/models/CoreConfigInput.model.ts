import {
  JsonApiModelConfig,
  Attribute,
  BelongsTo,

} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import { CoreConfigModel } from './CoreConfig.model';

@JsonApiModelConfig({
  type: 'core_config_input'
})
export class CoreConfigInputModel extends AbstractModel {
  //public static formClassRef = CoreConfigForm;
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

  @Attribute()
  select_options: any;

  @Attribute()
  placeholder: string;

  @Attribute()
  validation: any;

  @Attribute()
  wrapper_class: string;

  @Attribute()
  group: string;

  @Attribute()
  value: string;

  @Attribute()
  ng_if: any;

  @BelongsTo()
  core_config: CoreConfigModel

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}

  get fieldConfig() : ScaffoldFieldConfig {
    return {
      disabled: this.disabled,
      label: this.label,
      name: this.id,
      options: this.select_options,
      placeholder: this.placeholder,
      type: this.field_type,
      validation: this.validation,
      value: this.value,
      wrapper_class: this.wrapper_class,
      inputType: this.input_type,
      ng_if: this.ng_if,
    };
  }
}
