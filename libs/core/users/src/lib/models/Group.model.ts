import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from './Permission.model';

import { GroupForm } from '../forms/Group.form';

import { ExtraOptions } from '@webdjangular/core/decorator';

@JsonApiModelConfig({
  type: 'group'
})
export class GroupModel extends AbstractModel {
  public static formClassRef = GroupForm;

  @Attribute() id: string;

  @Attribute() name: string;

  @HasMany()
  @ExtraOptions({
    backendResourceName: 'Permission'
  })
  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}
}
