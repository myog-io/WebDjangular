import {
  JsonApiModelConfig,
  Attribute,
  HasMany,

} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { CoreConfigInputModel } from './CoreConfigInput.model';


@JsonApiModelConfig({
  type: 'core_config_group'
})
export class CoreConfigGroupModel extends AbstractModel {
  //public static formClassRef = CoreConfigForm;
  @Attribute()
  id: string;

  @Attribute()
  order: number;

  @HasMany()
  @ExtraOptions({
    backendResourceName: 'CoreConfigInput'
  })
  inputs: CoreConfigInputModel;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}
}
