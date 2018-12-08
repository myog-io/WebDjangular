import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';

import {AbstractModel} from '@webdjangular/core/data-models';
import {GroupModel} from './Group.model';

import {UserForm} from '../forms/User.form';

import {ExtraOptions} from '@webdjangular/core/decorator';
import {StyleAtTime} from "@angular/animations/browser/src/dsl/animation_timeline_builder";

@JsonApiModelConfig({
  type: 'user'
})
export class UserModel extends AbstractModel {
  public static formClassRef = UserForm;

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
  @ExtraOptions({
    backendResourceName: 'Group'
  })
  groups: GroupModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {

  }


  get is_guest(): boolean {
    return this.id === null;
  }


}
