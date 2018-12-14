import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { AuthorModel } from './Author.model';
import {SmartTableSettings} from "@webdjangular/core/data";
import {Validators} from "@angular/forms";
import {BlockModel} from "@webdjangular/core/cms-models";

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
    type: 'relationship',
    label: 'Author',
    wrapper_class: 'col-6',
    options_model: BlockModel,
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
