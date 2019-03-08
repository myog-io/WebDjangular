import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';
import { BlockModel } from './Block.model';
import {Validators, FormGroup} from "@angular/forms";
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { PageModel } from "@core/cms/src/lib/models/Page.model";


enum pageDG {
  general = 'general',
  seo = 'seo',
  options = 'options'
}

@JsonApiModelConfig({
  type: 'Page',
  modelEndpointUrl: 'cms/page',
})
export class PagePostModel extends PageModel {
  public static include = 'header,layout,footer';

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'hidden',
    value: 'post'
  })
  page_class;

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
    },
    {
      wrapper_class: 'col-4',
      groups: [
        {
          name: pageDG.options,
          title: 'Page Options',
        }
      ]
    }
  ];

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
      }
    },
    filters:{
      page_class: 'post'
    }
  };

}

