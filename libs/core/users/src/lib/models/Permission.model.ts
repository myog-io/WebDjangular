import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';
import { AbstractModel, ContentTypeModel } from '@core/data/src/lib/models';

@JsonApiModelConfig({
  type: 'Permission',
  modelEndpointUrl: 'permission',

})
export class PermissionModel extends AbstractModel {
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
