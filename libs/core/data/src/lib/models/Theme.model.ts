import { JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { AuthorModel } from './Author.model';
import { Validators } from '@angular/forms';
import { SmartTableSettings } from '../data-store/SmartTable.interfaces';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';

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
    type: 'ngSelect',
    label: 'Author',
    wrapper_class: 'col-6',
    model: AuthorModel,
    backendResourceName: 'Author'
  })
  author: AuthorModel;

  @BelongsTo()
  @ExtraOptions({
    type: 'ngSelect',
    label: 'Page',
    wrapper_class: 'col-6',
    model: ThemeModel,
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
      name: {
        title: 'Name',
        type: 'text'
      },
      slug: {
        title: 'Url Path',
        type: 'text'
      },
      version: {
        title: 'Version',
        type: 'text'
      },
      current_version: {
        title: 'Current Version',
        type: 'text'
      }
    }
  };
}
