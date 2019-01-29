import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { MenuModel } from '../models/Menu.model';
import { MenuItemModel } from '../models/MenuItem.model';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';


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
        
        this.retrieveEntry()
    }

    retrieveEntry(){
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
    }

    createMenuItem($event) {
        this.formLoading = true;

        let newMenuItem = this.datastore.createRecord(MenuItemModel)
        this.menuItemForm.updateModel(newMenuItem);
        if (!this.menu.menu_item) this.menu.menu_item = [];
        //newMenuItem.menu = this.menu
        this.menu.menu_item.push(newMenuItem)

        this.menu.saveAll().then(
            (result) => {
                console.log(result);
            }
        )

      }

}
