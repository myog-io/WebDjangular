import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';
import {PermissionForm} from '../forms/Permission.form';
import { AbstractModel, ContentTypeModel } from '@core/data/src/lib/models';

@JsonApiModelConfig({
  type: 'Permission',
  modelEndpointUrl: 'permission',

})
export class PermissionModel extends AbstractModel {
  public static formClassRef = PermissionForm;

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  codename: string;

  @BelongsTo()
  content_type: ContentTypeModel;

  get pk() {
    return this.id;
  }

  set pk(value) {
  }

  public toString = (): string => {
    return `${this.name} (${this.codename})`;
  }
}
