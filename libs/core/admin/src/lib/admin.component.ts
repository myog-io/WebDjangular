import { Component, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security'

import { MENU_ITEMS } from './admin-menu';

import { RoleProvider } from '@webdjangular/core/services';


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
  ) {

  }


  ngOnInit() {
    this.roleProvider.parsedPermissionsEmitter.subscribe(
      (perms) => {
        this.hideMenuItemsRecursively(perms, this.menu);
      }
    );
  }

  hideMenuItemsRecursively(permissions = {}, menuList = []) {
    for (let i = 0; i < menuList.length; i++) {
      if (typeof menuList[i]['children'] !== 'undefined') {
        this.hideMenuItemsRecursively(permissions, menuList[i]['children'])
      }
      else {
        if (typeof menuList[i]['data'] !== 'undefined') {
          if (typeof menuList[i].data['permission'] !== 'undefined') {
            for (let j = 0; j < menuList[i].data['permission'].length; j++) {
              const permLabelIndex = menuList[i].data['permission'][j]['label'];
              const permActionName = menuList[i].data['permission'][j]['action'];

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
