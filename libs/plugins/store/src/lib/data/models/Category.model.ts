import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { CategoryForm } from '../forms/Category.form';
import {FormControl, Validators} from "@angular/forms";
import {SmartTableSettings} from "@webdjangular/core/data";

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
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Category name',
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Category URL',
    wrapper_class: 'col-12',
    placeholder: 'Enter the Category URL',
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'ckeditor',
    label: 'Description',
    wrapper_class: 'col-12',
    placeholder: 'Enter Page Title',
  })
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

  public static smartTableOptions: SmartTableSettings = {
    columns: {
      name: {
        title: 'Name',
        type: 'text',
      },
      description: {
        title: 'Description',
        type: 'text',
      }
    },
  };

}
