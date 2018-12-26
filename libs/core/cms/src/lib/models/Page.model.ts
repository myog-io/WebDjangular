import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';

import {BlockModel} from './Block.model';
import {ExtraOptions} from '@webdjangular/core/decorator';
import {Validators} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";


@JsonApiModelConfig({
  type: 'Page',
  modelEndpointUrl: 'page',
})
export class PageModel extends AbstractModel {
  public static include = 'header,footer';

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Page Title',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Page Title',
  })
  title: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Page URL',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Page Url (slug)',
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'codeEditor',
    label: 'Page Content',
    wrapper_class: 'col-12'
  })
  content: string;

  @BelongsTo()
  @ExtraOptions({
    type: 'relationship',
    label: 'Header',
    name: 'header',
    wrapper_class: 'col-6',
    model: BlockModel,
    options_model: BlockModel,
    backendResourceName: 'Block'
  })
  header: BlockModel;

  @BelongsTo()
  @ExtraOptions({
    type: 'relationship',
    label: 'Footer',
    name: 'footer',
    wrapper_class: 'col-6',
    model: BlockModel,
    options_model: BlockModel,
    backendResourceName: 'Block'
  })
  footer: BlockModel;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

  public toString = (): string => {
    return `${this.title} (ID: ${this.id})`;
  };

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'text',
      },
      title: {
        title: 'Title',
        type: 'text',
      },
      slug: {
        title: 'Url Path',
        type: 'text',
      },
    },
  };

}

