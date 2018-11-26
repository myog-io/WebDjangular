import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';

import { ExtraOptions } from '@webdjangular/core/decorator';
import { CoreWebsiteModel } from './CoreWebsite.model';
import { CoreConfigForm } from '../forms/CoreConfig.form';

@JsonApiModelConfig({
  type: 'core_config'
})
export class CoreConfigModel extends AbstractModel {
  public static formClassRef = CoreConfigForm;

  @Attribute()
  slug: string;

  @Attribute()
  value: any;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'CoreWebsite'
  })
  core_website: CoreWebsiteModel

  permissions: PermissionModel[];

  get pk() {
    return this.slug;
  }

  set pk(value) {}
}
