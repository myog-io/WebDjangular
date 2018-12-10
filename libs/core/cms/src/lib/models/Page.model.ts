import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';

import { PageForm } from '../forms/Page.form';
import { BlockModel } from './Block.model';
import { ExtraOptions } from '@webdjangular/core/decorator';


@JsonApiModelConfig({
  type: 'Page',
  modelEndpointUrl: 'page',
})
export class PageModel extends AbstractModel {
  public static formClassRef = PageForm;
  public static include = 'header,footer';

  @Attribute()
  id: string;

  @Attribute()
  title: string;

  @Attribute()
  slug: string;

  @Attribute()
  content: string;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'Block'
  })
  header: BlockModel;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'Block'
  })
  footer: BlockModel;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[]

  get pk() {
    return this.id;
  }

  set pk(value) {

  }
  public toString = (): string => {
    return `${this.title} (ID: ${this.id})`;
  }

}

