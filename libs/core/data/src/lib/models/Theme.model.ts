import { JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';

import { ExtraOptions } from '@webdjangular/core/decorator';
import { AuthorModel } from './Author.model';
import {SmartTableSettings} from "@webdjangular/core/data";
import {Validators} from "@angular/forms";

@JsonApiModelConfig({
  type: 'core_theme'
})
export class ThemeModel extends AbstractModel {

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    placeholder: 'Enter the Theme Name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Slug',
    placeholder: 'Enter the Slug'
  })
  slug: string;

  @Attribute()
  angular_module: string;

  @Attribute()
  version: string;

  @Attribute()
  current_version: string;

  @Attribute()
  active: boolean;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

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

 public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      name: {
        title: 'Name',
        type: 'string'
      },
      slug: {
        title: 'Url Path',
        type: 'string'
      },
      version: {
        title: 'Version',
        type: 'string'
      },
      current_version: {
        title: 'Current Version',
        type: 'string'
      },
      active: {
        title: 'Active',
        type: 'string'
      }
    }
  };
}
