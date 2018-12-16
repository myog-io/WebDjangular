import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';

@JsonApiModelConfig({
  type: 'core_author'
})
export class AuthorModel extends AbstractModel {
  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  email: string;

  @Attribute()
  website: string;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}
}
