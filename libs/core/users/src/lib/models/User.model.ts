import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
} from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { GroupModel } from './Group.model';

import { UserForm } from '../forms/User.form';

import { ExtraOptions } from '@webdjangular/core/decorator';
import { PermissionModel } from './Permission.model';


@JsonApiModelConfig({
  type: 'User',
  modelEndpointUrl: 'user',
})
export class UserModel extends AbstractModel {
  public static formClassRef = UserForm;
  public static include = 'groups'
  @Attribute()
  id: string;

  @Attribute()
  password: string;

  @Attribute()
  last_login: Date;

  @Attribute()
  is_superuser: boolean;

  @Attribute()
  first_name: string;

  @Attribute()
  middle_name: string;

  @Attribute()
  last_name: string;

  @Attribute()
  username: string;

  @Attribute()
  email: string;

  @Attribute()
  mobile: string;

  @Attribute()
  is_tfa_enabled: boolean;

  @Attribute()
  is_email_verified: boolean;

  @Attribute()
  is_mobile_verified: boolean;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  @Attribute()
  data: any = {};

  @HasMany()
  groups: GroupModel;

  @HasMany()
  user_permissions: PermissionModel;

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

  get name(): string {
    return `${this.first_name} ${this.last_name}`
  }

  get full_name(): string {
    return `${this.first_name} ${this.middle_name} ${this.last_name}`
  }

  get is_guest(): boolean {
    return this.id === null;
  }


}
