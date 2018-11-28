import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';

import { BlockForm } from '../forms/Block.form';


@JsonApiModelConfig({
  type: 'Block',
  modelEndpointUrl: 'block',
})
export class BlockModel extends AbstractModel {

  public static formClassRef = BlockForm;


  @Attribute()
  id: string;

  @Attribute()
  title: string;

  @Attribute()
  slug: string;

  @Attribute()
  content: string;

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
    return `${this.title} (#${this.id})`;
  }

}

