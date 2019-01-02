import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { WebAngularDataStore } from '@webdjangular/core/services';

import { MenuModel } from '../models/Menu.model';
import { MenuItemModel } from '../models/MenuItem.model';
import { PageModel } from '../models/Page.model';

import { AbstractForm } from '@webdjangular/core/data-forms';


@Component({
  selector: 'core-cms-menu_builder',
  styleUrls: ['./menu_builder.component.scss'],
  templateUrl: './menu_builder.component.html',
})
export class MenuBuilderComponent {
    public form: AbstractForm;
    public menu: MenuModel;

    public menuItemForm: AbstractForm;

    public formLoading = false;

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.menu.menu_item, event.previousIndex, event.currentIndex);
    }

    constructor(
        private datastore: WebAngularDataStore
    ) {
    }

    ngOnInit(){
        let menuItemEmpty = this.datastore.createRecord(MenuItemModel)
        this.menuItemForm = menuItemEmpty.getForm()
        this.menuItemForm.generateForm()
        
        this.datastore.findRecord(MenuModel, '1', {
            include: 'MenuItem'
        }).subscribe(
            (data: MenuModel) => {
                this.menu = data;
                this.form = this.menu.getForm()
                this.form.generateForm();
                this.formLoading = false;
            }
        );

    }

    createMenuItem($event) {
        this.formLoading = true;
        
        let newMenuItem = this.datastore.createRecord(MenuItemModel)
        this.menuItemForm.updateModel(newMenuItem);

        this.menu.menu_item.push(newMenuItem)

        this.menu.save({
            include: 'MenuItem',
        }).subscribe(
            (result) => {
                this.formLoading = false;
                console.log(result)
            }
        )
    
      }

}
