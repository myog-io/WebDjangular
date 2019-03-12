import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ContentChild, ViewChild, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { MenuModel } from '../models/Menu.model';
import { MenuItemModel } from '../models/MenuItem.model';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { Subscription } from 'rxjs';
import { NestableSettings } from 'ngx-nestable/src/nestable.models';
import { NestableComponent } from 'ngx-nestable';
import { NbToastrService, NbDialogService, NbDialogRef } from '@nebular/theme';



@Component({
  selector: 'core-cms-menu_builder',
  styleUrls: ['./menu_builder.component.scss'],
  templateUrl: './menu_builder.component.html',
})
export class MenuBuilderComponent implements OnInit, OnDestroy {
  public form: AbstractForm;
  public current_menu: MenuModel;

  public menuItemForm: AbstractForm;
  public menuForm: AbstractForm;
  public menu_item_forms: any;
  public formLoading = false;
  private menusSub: Subscription;
  public menus: MenuModel[] = [];
  @ViewChild('dialog') dialogTemplate: TemplateRef<any>;
  protected dialogRef: NbDialogRef<any>;
  @ViewChild(NestableComponent) nestable: NestableComponent
  public options = { fixedDepth: false } as NestableSettings;
  public list = [];

  constructor(
    private datastore: WebAngularDataStore,
    private el: ElementRef,
    private renderer: Renderer2,
    private toaster: NbToastrService,
    private dialogService: NbDialogService,
  ) {
    this.renderer.listen(this.el.nativeElement, 'listUpdated', e => {
      this.list = e.detail.list;
    });
  }
  openDialog() {
    // TODO IMplement Write id number for more
    this.dialogRef = this.dialogService.open(this.dialogTemplate, {
      context: {
        title: `Delete ${this.current_menu}`,
        body: `Please confirm that you would like to delete this ${this.current_menu}`,
      },
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
      this.current_menu = next_menu;
      this.loadCurrentMenu();
    }
  }
  removeItem($event, item_id) {
    this.formLoading = true;
    this.datastore.deleteRecord(MenuItemModel, item_id).subscribe((response) => {
      this.current_menu.menu_item.slice(this.current_menu.menu_item.findIndex((item => item.id == item_id)), 1);
      this.menu_item_forms[item_id] = null;
      delete this.menu_item_forms[item_id];
      this.removeFromList(this.list, item_id);
      this.formLoading = false;
    })


  }
  deleteCurrentMenu() {
    if (this.current_menu.id) {
      this.formLoading = true;
      const id = this.current_menu.id;
      this.datastore.deleteRecord(MenuModel, id).subscribe((response) => {
        this.formLoading = false;
      });
    }
    if (this.menus.length > 0) {
      this.menus.splice(this.menus.indexOf(this.current_menu), 1)
      this.current_menu = this.menus[0];
      this.loadCurrentMenu();
    } else {
      alert("Please Create a Menu");
    }
    this.dialogRef.close();

  }
  createNewMenu() {
    this.current_menu = this.datastore.createRecord(MenuModel);
    this.current_menu.title = "New Menu";
    this.current_menu.menu_item = [];
    this.menus.push(this.current_menu);
    this.loadCurrentMenu();
  }
  saveAllPromise(): Promise<MenuItemModel>[] {
    const promises = [];
    if (this.current_menu.menu_item) {
      for (let i = 0; i < this.current_menu.menu_item.length; i++) {
        const item = this.current_menu.menu_item[i];
        const form = this.menu_item_forms[item.id];
        if (item.parent) {
          const parent_list = this.recursiveFindById(this.list, item.parent.id);
          item.position = parent_list.children.findIndex((i) => i.id == item.id);
        } else {
          item.position = this.list.findIndex((i) => i.id == item.id);
        }
        form.updateModel(item);
        promises.push(item.save({ include: 'parent,children' }).toPromise());
      }
    }
    return promises;
  }
  saveMenu() {
    this.formLoading = true;
    this.menuForm.updateModel(this.current_menu);
    this.current_menu.save().subscribe(
      (menu) => {
        this.current_menu = null;
        this.current_menu = menu;
        const promises = this.saveAllPromise();
        if (promises.length > 0) {
          Promise.all(this.saveAllPromise()).then(
            (menu_items) => {
              this.current_menu.menu_item = menu_items;
              this.formLoading = false;
            }
          );
        } else {
          this.formLoading = false;
        }
      },
      (error) => {
        this.formLoading = false;
        if (error.errors && error.errors.length > 0) {
          for (let i = 0; i < error.errors.length; i++) {
            // TODO: Check pointer to see if is for an specific field and set an error inside the field
            const element = error.errors[i];
            this.toaster.danger(`Error saving the Changes, Details: ${element.detail}`, `Error!`, { duration: 5000 });
          }
        } else {
          this.toaster.danger(`Error saving the Changes`, `Error!`);
        }
      }
    )


  }
  retrieveEntry() {
    this.menusSub = this.datastore.findAll(MenuModel).subscribe((query) => {
      this.menus = query.getModels();
      this.current_menu = this.menus[0];
      this.loadCurrentMenu();

    });
  }

  loadCurrentMenu() {
    if (!this.menuForm) {
      this.menuForm = this.current_menu.getForm();
      this.menuForm.generateForm();
    }
    this.menuForm.reset();
    this.menuForm.populateForm(this.current_menu);
    this.list = [];
    this.menu_item_forms = {};
    if (this.current_menu.id) {
      this.menusSub = this.datastore.findAll(MenuItemModel,
        { include: 'children,parent' }, null, `/api/cms/menu/${this.current_menu.id}/menu_item/`)
        .subscribe(
          (query2) => {
            this.current_menu.menu_item = query2.getModels();

            for (let i = 0; i < this.current_menu.menu_item.length; i++) {
              const menu_item = this.current_menu.menu_item[i];
              const form = menu_item.getForm();
              form.displayGroups = menu_item.displayGroups;
              form.generateForm();
              form.populateForm(menu_item);
              this.menu_item_forms[menu_item.id] = form;
            }
            this.list = this.current_menu.getList();
            setTimeout(() => {
              this.nestable.expandAll();
            }, 300);
          }
        );
    }
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
    if (!this.current_menu.id) {
      alert("Please create/save the form before adding items");
    }
    this.formLoading = true;

    const new_item = this.datastore.createRecord(MenuItemModel)
    new_item.menu = this.current_menu
    if (this.current_menu.menu_item.length > 0) {
      new_item.position = this.current_menu.menu_item[this.current_menu.menu_item.length - 1].position + 1;
    } else {
      new_item.position = 0;
    }
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
  public pushItem(item: MenuItemModel) {
    this.list.push(item.getList());
    this.list = [...this.list];
  }


  public drag(e) {
    //console.log("Drag", e);
  }

  public drop(e) {

    if (e.changedElementPosition) {
      const index = this.current_menu.menu_item.findIndex(i => i.id === e.item.id);
      const item: MenuItemModel = this.current_menu.menu_item[index];
      // Cleaning Parents First
      if (item.parent) {
        const parent = this.current_menu.menu_item.find(i => i.id === item.parent.id);
        parent.children.splice(
          parent.children.findIndex((i) => i.id === item.id),
          1
        );
        item.parent = null;
        this.current_menu.menu_item[index].parent = null;
      }
      // Now e set the new detinations
      if (e.destination) {
        const parent: MenuItemModel = this.current_menu.menu_item.find(i => i.id === e.destination.id);
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item);
        item.parent = parent;
      }
    }
  }

  private recursiveFindById(items, id) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) {
        return item;
      }
      if (item.children && item.children.length > 0 && item.id !== id) {
        const found = this.recursiveFindById(item.children, id);
        if (found) {
          return found;
        }
      }

    }
  }
  private removeFromList(list, id): boolean {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.id === id) {
        this.list.splice(i, 1);
        return true;
      }
      if (item.children && item.children.length > 0 && item.id !== id) {
        const found = this.removeFromList(item.children, id);
        if (found === true) {
          return found;
        }
      }
    }
  }

  public onDisclosure(e) {
    console.log("DISCLOSURE", e);
  }
}
