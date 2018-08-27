import { Component } from '@angular/core';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { WebAngularDataStore } from '../@core/data/data-store/WebAngularDataStore.service';

import { User } from '../@core/data/models/User.model';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private datastore: WebAngularDataStore){

  }
}
