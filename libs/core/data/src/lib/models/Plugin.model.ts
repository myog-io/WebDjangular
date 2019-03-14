import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { AuthorModel } from './Author.model';
import {Validators} from "@angular/forms";
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '../data-store';

@JsonApiModelConfig({
  type: 'core_plugin'
})
export class PluginModel extends AbstractModel {

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    placeholder: 'Enter the Plugin Name'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Slug',
    placeholder: 'Enter the Plugin slug'
  })
  slug: string;

  @Attribute()
  current_version: string;

  @Attribute()
  version: string;

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
