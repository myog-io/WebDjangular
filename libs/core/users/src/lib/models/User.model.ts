import {
  Attribute,
  HasMany,
  JsonApiModelConfig,
  NestedAttribute
} from 'angular2-jsonapi';
import { GroupModel } from './Group.model';
import { PermissionModel } from './Permission.model';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'User',
  modelEndpointUrl: 'user'
})
export class UserModel extends AbstractModel {
  public static include = 'groups';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'First Name',
    wrapper_class: 'col-4'
  })
  first_name: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Middle Name',
    wrapper_class: 'col-4'
  })
  middle_name: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Last Name',
    wrapper_class: 'col-4'
  })
  last_name: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Username',
    wrapper_class: 'col-4'
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
    label: 'Mobile',
    wrapper_class: 'col-4',
    inputType: 'tel'
  })
  mobile: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Password',
    wrapper_class: 'col-4',
    inputType: 'password'
  })
  password: string;

  @Attribute()
  is_tfa_enabled: boolean;

  @Attribute()
  is_email_verified: boolean;

  @Attribute()
  is_mobile_verified: boolean;

  @Attribute()
  is_active: boolean;

  @Attribute()
  is_staff: boolean;

  @NestedAttribute()
  extra_data: any;

  @Attribute()
  last_login: Date;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  @NestedAttribute()
  data: any = {};

  @HasMany()
  @ExtraOptions({
    type: 'checkbox',
    label: 'Groups',
    wrapper_class: 'col-12',
    model: GroupModel
  })
  groups: GroupModel;

  @HasMany()
  user_permissions: PermissionModel;

  get pk() {
    return this.id;
  }

  set pk(value) {}

  get name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  get full_name(): string {
    return `${this.first_name} ${this.middle_name} ${this.last_name}`;
  }

  get is_guest(): boolean {
    return this.id === null;
  }

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text'
      },
      email: {
        title: 'Email',
        type: 'html'
      }
    }
  };
}
