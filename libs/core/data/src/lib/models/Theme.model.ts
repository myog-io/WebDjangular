import { JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users';

import { ThemeForm } from '../forms/Theme.form';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { AuthorModel } from './Author.model';

@JsonApiModelConfig({
  type: 'core_theme'
})
export class ThemeModel extends AbstractModel {
  public static formClassRef = ThemeForm;

  @Attribute() id: string;

  @Attribute() slug: string;

  @Attribute() name: string;

  @Attribute() angular_module: string;

  @Attribute() version: string;

  @Attribute() current_version: string;

  @Attribute() active: boolean;

  @Attribute() created: Date;

  @Attribute() updated: Date;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'Author'
  })
  author: AuthorModel;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'Page'
  })
  parent: ThemeModel;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}
}
