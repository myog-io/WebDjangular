import { JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';

import { ExtraOptions } from '@webdjangular/core/decorator';
import { AuthorModel } from './Author.model';
import {SmartTableSettings} from "@webdjangular/core/data";
import {Validators} from "@angular/forms";
import {BlockModel} from "@webdjangular/core/cms-models";

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
    type: 'relationship',
    label: 'Author',
    wrapper_class: 'col-6',
    options_model: BlockModel,
    backendResourceName: 'Author'
  })
  author: AuthorModel;

  @BelongsTo()
  @ExtraOptions({
    type: 'relationship',
    label: 'Page',
    wrapper_class: 'col-6',
    options_model: BlockModel,
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
