import { Attribute, HasMany, JsonApiModelConfig } from 'angular2-jsonapi';
import { PermissionModel } from './Permission.model';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { SmartTableSettings } from '@core/data/src/lib/data-store';

@JsonApiModelConfig({
  type: 'Group',
  modelEndpointUrl: 'group'
})
export class GroupModel extends AbstractModel {
  public static include = 'permissions';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-12'
  })
  name: string;

  @HasMany()
  @ExtraOptions({
    type: 'checkbox',
    label: 'Permissions',
    wrapper_class: 'col-12',
    model: PermissionModel
  })
  permissions: PermissionModel;

  get pk() {
    return this.id;
  }

  set pk(value) {}

  public toString = (): string => {
    return `${this.name} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text'
      }
    }
  };
}
