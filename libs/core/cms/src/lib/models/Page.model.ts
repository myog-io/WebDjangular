import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';

import {AbstractModel} from '@webdjangular/core/data-models';
import {PermissionModel} from '@webdjangular/core/users-models';

import { BlockModel } from './Block.model';
import { ExtraOptions } from '@webdjangular/core/decorator';
import {Validators, FormGroup} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";
import {ProductClasses} from "../../../../../plugins/store/src/lib/data/interfaces/Product.interface";

enum pageDG {
  general = 'general',
  seo = 'seo'
}

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
    displayGroup: pageDG.general
  })
  title: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Page URL',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Page Url (slug)',
    displayGroup: pageDG.general
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'codeEditor',
    label: 'Page Content',
    wrapper_class: 'col-12',
    displayGroup: pageDG.general
  })
  content: string;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    type: 'select',
    label: 'Header',
    wrapper_class: 'col-6',
    model: BlockModel,
    displayGroup: pageDG.general
  })
  header: BlockModel;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    type: 'select',
    label: 'Footer',
    wrapper_class: 'col-6',
    model: BlockModel,
    displayGroup: pageDG.general
  })
  footer: BlockModel;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Title',
    wrapper_class: 'col-12',
    placeholder: '',
    displayGroup: pageDG.seo
  })
  seo_title: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Description',
    wrapper_class: 'col-12',
    placeholder: '',
    displayGroup: pageDG.seo
  })
  seo_description: string;

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


  public displayGroups = [
    {
      wrapper_class: 'col-12',
      groups: [
        {
          name: pageDG.general,
          title: '',
        }
      ]
    },
    {
      wrapper_class: 'col-12',
      groups: [
        {
          name: pageDG.seo,
          title: 'SEO',
        }
      ]
    }

  ];

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

