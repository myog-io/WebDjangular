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
import {SmartTableSettings} from "@webdjangular/core/data";
import {FormArray} from "@angular/forms";
import {StreetModel} from "@webdjangular/plugins/provider-data";


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
  @ExtraOptions({
    type: 'text',
    label: 'First Name',
    wrapper_class: 'col-4',
  })
  first_name: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Middle Name',
    wrapper_class: 'col-4',
  })
  middle_name: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Last Name',
    wrapper_class: 'col-4',
  })
  last_name: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Username',
    wrapper_class: 'col-4',
  })
  username: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Email',
    wrapper_class: 'col-4',
    inputType: 'email'
  })
  email: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Password',
    wrapper_class: 'col-4',
    inputType: 'password'
  })
  password: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Mobile',
    wrapper_class: 'col-4',
    inputType: 'tel'
  })
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
  @ExtraOptions({
    type: 'checkbox',
    label: 'Groups',
    wrapper_class: 'col-12',
    options_model: GroupModel,
  })
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

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',

      },
      email: {
        title: 'Email',
        type: 'html',
      },
    },
  };

}
