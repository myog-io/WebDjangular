import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';

import { MenuForm } from '../forms/Menu.form';


@JsonApiModelConfig({
  type: 'Menu',
  modelEndpointUrl: 'menu',
})
export class MenuModel extends AbstractModel {

  public static formClassRef = MenuForm;


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

}

