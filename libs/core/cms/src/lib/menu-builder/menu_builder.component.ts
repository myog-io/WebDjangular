import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ContentChild, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { MenuModel } from '../models/Menu.model';
import { MenuItemModel } from '../models/MenuItem.model';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { Subscription } from 'rxjs';
import { NestableSettings } from 'ngx-nestable/src/nestable.models';
import { NestableComponent } from 'ngx-nestable';



@Component({
  selector: 'core-cms-menu_builder',
  styleUrls: ['./menu_builder.component.scss'],
  templateUrl: './menu_builder.component.html',
})
export class MenuBuilderComponent implements OnInit, OnDestroy {
  public form: AbstractForm;
  public current_menu: MenuModel;

  public menuItemForm: AbstractForm;
  public MenuForm: AbstractForm;
  public menu_item_forms: any;
  public formLoading = false;
  private menusSub: Subscription;
  public menus: MenuModel[] = [];
  
  @ViewChild(NestableComponent) nestable: NestableComponent
  public options = { fixedDepth: false } as NestableSettings;
  public list = [];

  constructor(
    private datastore: WebAngularDataStore,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.listen(this.el.nativeElement, 'listUpdated', e => {
      console.log("List Updated")
      this.list = e.detail.list;
    });
  }

  ngOnInit() {
    let menuItemEmpty = this.datastore.createRecord(MenuItemModel)
    this.menuItemForm = menuItemEmpty.getForm()
    this.menuItemForm.generateForm()

    this.retrieveEntry()
  }

  ngOnDestroy() {
    if (this.menusSub) {
      this.menusSub.unsubscribe();
      this.menusSub = null;
    }
  }
  changeMenu(next_menu: MenuModel) {
    if (this.current_menu !== next_menu) {
      this.current_menu = next_menu
    }
  }
  removeItem($event, item_id) {
    this.formLoading = true;
    this.datastore.deleteRecord(MenuItemModel, item_id).subscribe((response) => {
      this.current_menu.menu_item.slice(this.current_menu.menu_item.findIndex((item => item.id == item_id)), 1);
      delete this.menu_item_forms[item_id];
      this.menu_item_forms[item_id] = null;
      this.formLoading = false;
    })


  }
  createNewMenu() {

  }
  saveAllPromise(): Promise<MenuItemModel>[] {
    const promises = [];
    for (let i = 0; i < this.current_menu.menu_item.length; i++) {
      const item = this.current_menu.menu_item[i];
      const form = this.menu_item_forms[item.id];
      form.updateModel(item);
      promises.push(item.save().toPromise());
    }
    return promises;
  }
  saveMenu() {
    this.formLoading = true;
    Promise.all(this.saveAllPromise()).then(
      (menu_items) => {
        this.current_menu.menu_item = menu_items;
        this.formLoading = false;
      }
    );

  }
  retrieveEntry() {
    this.menusSub = this.datastore.findAll(MenuModel, { include: 'menu_item,menu_item.children' }).subscribe((query) => {
      this.menus = query.getModels();
      this.current_menu = this.menus[0];
      this.menu_item_forms = {};
      for (let i = 0; i < this.current_menu.menu_item.length; i++) {
        
        const menu_item = this.current_menu.menu_item[i];
        console.log(menu_item)
        const form = menu_item.getForm();
        form.generateForm();
        form.populateForm(menu_item);
        this.menu_item_forms[menu_item.id] = form;
      }
      this.list = this.current_menu.getList();
      setTimeout(() => {
        this.nestable.expandAll();  
      }, 300);
      
      console.log(this.list);
    });
    /*
    this.datastore.findRecord(MenuModel, '1', {
        include: 'menu_item'
    }).subscribe(
        (data: MenuModel) => {
            this.menu = data;
            this.form = this.menu.getForm()
            this.form.generateForm();
            this.formLoading = false;
        }
    );
    */
  }
  updateMenuItem($event, item_id) {
    this.formLoading = true;
    const form = this.menu_item_forms[item_id];
    const item = this.current_menu.menu_item.find((i) => i.id === item_id);
    form.updateModel(item)
    item.save().subscribe((menu_item) => {
      form.populateForm(menu_item);
      this.formLoading = false;
    })

  }
  createMenuItem($event) {
    this.formLoading = true;

    const new_item = this.datastore.createRecord(MenuItemModel)
    new_item.menu = this.current_menu
    new_item.position = this.current_menu.menu_item[this.current_menu.menu_item.length - 1].position + 1;
    this.menuItemForm.updateModel(new_item);

    if (!this.current_menu.menu_item) this.current_menu.menu_item = [];
    new_item.save().subscribe((item) => {
      this.current_menu.menu_item.push(item);
      const form = item.getForm();
      form.generateForm();
      form.populateForm(item);
      this.menu_item_forms[item.id] = form;
      this.menuItemForm.reset();
      this.pushItem(item);
      this.formLoading = false;
      
    });
  }
  public pushItem(item:MenuItemModel) {
    this.list.push(item.getList());
    this.list = [...this.list];
  }

  
  public drag(e) {
    console.log("Drag",e);
  }

  public drop(e) {
    console.log("DROP",e);
    //if(e.destination){
    //  this.nestable.expandAll();
    //}
    if(e.changedElementPosition){
      const item = this.recursiveFindById(this.current_menu.menu_item, e.item.id);
      if(e.destination){
        item.parent = this.recursiveFindById(this.current_menu.menu_item, e.destination.id);
        item.position = e.destination.children.findIndex((i) => i.id == e.item.id);
      }else{
        item.position = this.list.findIndex((i) => i.id == e.item.id);
      }
      
    }
  }
  
  private recursiveFindById(items, id){
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if(item.children && item.children.length > 0 && item.id !== id){
        const found = this.recursiveFindById(item.children,id);
        if(found){
          return found;
        }
      }
      if(item.id === id){
        return item;
      }
    }
  }

  public onDisclosure(e) {
    console.log("DISCLOSURE",e);
  }
}
