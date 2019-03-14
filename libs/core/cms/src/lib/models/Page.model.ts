import {Attribute, BelongsTo, JsonApiModelConfig} from 'angular2-jsonapi';
import { BlockModel } from './Block.model';
import {Validators, FormGroup} from "@angular/forms";
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import {BlockHeaderModel} from "@core/cms/src/lib/models/BlockHeader.model";
import {BlockFooterModel} from "@core/cms/src/lib/models/BlockFooter.model";
import {BlockLayoutModel} from "@core/cms/src/lib/models/BlockLayout.model";


enum pageDG {
  general = 'general',
  seo = 'seo',
  options = 'options'
}

@JsonApiModelConfig({
  type: 'Page',
  modelEndpointUrl: 'cms/page',
})
export class PageModel extends AbstractModel {
  public include = 'header,footer,layout';

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
    type: 'ngSelect',
    label: 'Header',
    wrapper_class: 'col-12',
    model: BlockHeaderModel,
    options:{ block_class: 'header'},
    displayGroup: pageDG.options
  })
  header: BlockHeaderModel;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    type: 'ngSelect',
    label: 'Layout',
    wrapper_class: 'col-12',
    model: BlockLayoutModel,
    options:{ block_class: 'layout'},
    displayGroup: pageDG.options
  })
  layout: BlockLayoutModel;

  @BelongsTo()
  @ExtraOptions({
    formType: FormGroup,
    type: 'ngSelect',
    label: 'Footer',
    wrapper_class: 'col-12',
    model: BlockFooterModel,
    options:{ block_class: 'footer'},
    displayGroup: pageDG.options
  })
  footer: BlockFooterModel;

  @Attribute()
  @ExtraOptions({
    type: 'switch',
    label: 'Searchable',
    wrapper_class: 'col-12',
    value: true,
    placeholder: '',
    displayGroup: pageDG.seo
  })
  is_searchable: boolean;


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

  is_home: boolean = false;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

  getContent():string {
    return this.content;
  }

  setHome() {
    this.is_home = true;
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

