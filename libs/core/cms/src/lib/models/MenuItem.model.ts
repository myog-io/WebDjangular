import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Validators } from "@angular/forms";
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { PermissionModel } from '@core/users/src/lib/models';


@JsonApiModelConfig({
  type: 'MenuItem',
  modelEndpointUrl: 'cms/menu_item',
})
export class MenuItemModel extends AbstractModel {

  @Attribute()
  id: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required],
    type: 'text',
    label: 'Name',
    wrapper_class: 'col-12'
  })
  name: string;

  @Attribute()
  @ExtraOptions({
    validators: [Validators.required, Validators.pattern('^[a-z0-9-_\/]+$')],
    type: 'text',
    label: 'URL',
    wrapper_class: 'col-12'
  })
  url: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: '"alt" attribute',
    wrapper_class: 'col-6'
  })
  alt: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'CSS Class',
    wrapper_class: 'col-6'
  })
  css_class: string;
  
  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: '#fragment (after link)',
    wrapper_class: 'col-6'
  })
  fragment: string;

  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'text',
    label: 'Icon',
    wrapper_class: 'col-6'
  })
  icon: string;

 


  @Attribute()
  @ExtraOptions({
    validators: [],
    type: 'ngSelect',
    label: '"target" attribute',
    options: [
      { id: '_self', name: 'Self' },
      { id: '_blank', name: 'Blank' },
      { id: '_parent', name: 'Parent' },
      { id: '_top', name: 'Top' }
    ],
    value: '_self',
    wrapper_class: 'col-12',
    
    
  })
  target: string;


  @Attribute()
  position: number;

  @BelongsTo()
  parent: MenuItemModel;

  @BelongsTo()
  menu: any;

  @HasMany()
  children: MenuItemModel[];

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
  get class() {
    return this.css_class;
  }
  set class(css_class:string) {
    this.css_class = css_class;
  }

  arrangeItems(){
    this.children.sort((a,b)=> a.position - b.position);
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].children.length > 0){
        this.children[i].arrangeItems();
      }
    }
  }

  getList(){
    const node:any = {}
    node.id = this.id;
    node.url = this.url;
    node.name = this.name;
    node['$$expanded'] = true;
    node.displayGroups = this.displayGroups;
    node.children = [];
    this.service
    if (this.children && this.children.length > 0) {
      for (let i = 0; i < this.children.length; i++) {
        const item = this.children[i];
        node.children.push(item.getList());
        
      }
    }
    return node;
  }
}

