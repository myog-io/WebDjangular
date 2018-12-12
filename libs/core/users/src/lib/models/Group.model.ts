import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
} from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from './Permission.model';

import { GroupForm } from '../forms/Group.form';

import { ExtraOptions } from '@webdjangular/core/decorator';

@JsonApiModelConfig({
  type: 'Group',
  modelEndpointUrl: 'group',

})
export class GroupModel extends AbstractModel {
  public static formClassRef = GroupForm;
  public static include = 'permissions';
  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @HasMany()
  @ExtraOptions({
    backendResourceName: 'Permission'
  })
  permissions: PermissionModel;

  get pk() {
    return this.id;
  }

  set pk(value) { }

  public toString = (): string => {
    return `${this.name} (ID: ${this.id})`;
  }
}
