import { Component, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security'

import { MENU_ITEMS } from './admin-menu';

import { RoleProvider, WebAngularDataStore } from '@webdjangular/core/services';
import { CoreConfigModel } from 'libs/core/data/src/lib/models/CoreConfig.model';
import { CoreConfigGroupModel } from 'libs/core/data/src/lib/models/CoreConfigGroup.model';
import { JsonApiQueryData } from 'angular2-jsonapi';


@Component({
  selector: 'webdjangular-admin',
  template: `
    <webdjangular-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </webdjangular-sample-layout>
  `,
})
export class AdminComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor(
    public accessChecker: NbAccessChecker,
    public roleProvider: RoleProvider,
    private datastore: WebAngularDataStore,
  ) {

  }


  ngOnInit() {
    this.roleProvider.parsedPermissionsEmitter.subscribe(
      (perms) => {
        // TODO: Read User Is Super User
        this.hideMenuItemsRecursively(perms, this.menu);
      }
    );
    this.getDynamicMenu()
  }
  getDynamicMenu(){
    this.datastore.findAll(CoreConfigGroupModel).subscribe((data:JsonApiQueryData<CoreConfigGroupModel>) => {
      //TODO: Do this Dynamically, for now we belive that the Config will always be at last
      const i = this.menu.length -1;
      const i2 = this.menu[i].children.length -1;
      const models = data.getModels();
      for (const m in models) {
        if (models.hasOwnProperty(m)) {
          const element = models[m];
          this.menu[i].children[i2].children.push({
            title: element.title,
            link: `/core_config_group/${element.id}`,
            hidden: false,
            data: {
              permission: [
                { label: 'webdjango', action: 'view_coreconfig' }
              ]
            }
          })
        }
      }
    })
  }

  hideMenuItemsRecursively(permissions = {}, menuList = []) {
    for (let i = 0; i < menuList.length; i++) {
      if (typeof menuList[i]['children'] !== 'undefined') {

        this.hideMenuItemsRecursively(permissions, menuList[i]['children'])
      }
      else {
        if (typeof menuList[i]['data'] !== 'undefined') {
          // Let's Check for the Permissions
          if (typeof menuList[i].data['permission'] !== 'undefined') {
            for (let j = 0; j < menuList[i].data['permission'].length; j++) {
              const permLabelIndex = menuList[i].data['permission'][j]['label'];
              const permActionName = menuList[i].data['permission'][j]['action'];
              //list_core_website
              if (typeof permissions[permLabelIndex] !== 'undefined') {
                //we do a OR for the permission (it must have at least 1)
                if (permissions[permLabelIndex].indexOf(permActionName) === -1) {
                  menuList[i].hidden = true;
                  break;
                }
              }
              else {
                menuList[i].hidden = true;
              }
            }
          }
        }
      }
    }
  }
}
