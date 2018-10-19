import {
  JsonApiModelConfig,
  Attribute,

} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';


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
  wrapperClass: string

  @Attribute()
  group: string



  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}
}
