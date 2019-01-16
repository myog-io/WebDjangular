import { JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Validators, FormGroup, FormArray } from "@angular/forms";
import { MenuItemModel } from './MenuItem.model';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';



@JsonApiModelConfig({
  type: 'Menu',
  modelEndpointUrl: 'menu',
})
export class MenuModel extends AbstractModel {
  include = "menu_item"
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

