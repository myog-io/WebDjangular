import {
  JsonApiModelConfig,
  JsonApiModel,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data';
import { PermissionForm } from '../forms/Permission.form';
import { ContentTypeModel } from '@webdjangular/core/data';

@JsonApiModelConfig({
  type: 'permission'
})
export class PermissionModel extends AbstractModel {
  public static formClassRef = PermissionForm;

  @Attribute() id: string;

  @Attribute() name: string;

  @Attribute() codename: string;

  @BelongsTo() content_type: ContentTypeModel;

  get pk() {
    return this.id;
  }

  set pk(value) {}
}
