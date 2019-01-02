import { JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';
import { ExtraOptions } from '@webdjangular/core/decorator';
import { Validators, FormGroup, FormArray } from "@angular/forms";
import { MenuItemModel } from './MenuItem.model';


@JsonApiModelConfig({
  type: 'Menu',
  modelEndpointUrl: 'menu',
})
export class MenuModel extends AbstractModel {

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Menu Title',
    wrapper_class: 'col-12'
  })
  title: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_]+$')],
    type: 'text',
    label: 'Menu Slug',
    wrapper_class: 'col-12'
  })
  slug: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Menu Wrapper Class',
    wrapper_class: 'col-12'
  })
  wrapper_class: string;

  @HasMany()
  @ExtraOptions({
    formType: FormArray,
    type: 'select',
    label: 'Menu Itens',
    wrapper_class: 'col-6',
    model: MenuItemModel,
    options_model: MenuItemModel,
    backendResourceName: 'menu_item'
  })
  menu_item: MenuItemModel[];


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

