import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { CategoryForm } from '../forms/Category.form';
import {FormControl, Validators} from "@angular/forms";

@JsonApiModelConfig({
  type: 'ProductCategory',
  modelEndpointUrl: 'store/category',
})
export class CategoryModel extends AbstractModel {
  public static formClassRef = CategoryForm;
  public static include = null;

  @Attribute()
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  slug: string;

  @Attribute()
  description: string;

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

}
