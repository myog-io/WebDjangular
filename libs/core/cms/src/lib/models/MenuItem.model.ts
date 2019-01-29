import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Validators } from "@angular/forms";
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';


@JsonApiModelConfig({
  type: 'MenuItem',
  modelEndpointUrl: 'menu_item',
})
export class MenuItemModel extends AbstractModel {

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Menu item name',
    wrapper_class: 'col-12'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Menu item URL',
    wrapper_class: 'col-12'
  })
  url: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Menu item "alt" attribute',
    wrapper_class: 'col-12'
  })
  alt: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Menu item "target" attribute',
    wrapper_class: 'col-12'
  })
  target: string;


  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Menu item position',
    wrapper_class: 'col-12'
  })
  position: string;

  @BelongsTo({key:'MenuItem'})
  parent:MenuItemModel;

  @BelongsTo({key:'Menu'})
  menu: any;

  @HasMany({key:'MenuItem'})
  children:MenuItemModel[];

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

