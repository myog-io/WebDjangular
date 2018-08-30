import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router";

import { WebAngularDataStore } from '../../@core/data/data-store/WebAngularDataStore.service';
import { WebAngularSmartTableDataSource } from '../../@core/data/data-store/WebAngularSmartTableDataSource';

import { User } from '../../@core/data/models/User.model';



@Component({
    selector: 'webdjangular-user',
    styleUrls: ['./user.component.scss'],
    templateUrl: './user.component.html',
})
export class UserComponent{

    source: WebAngularSmartTableDataSource  = new WebAngularSmartTableDataSource(this.datastore, User, {
        smartTableSettings: {
            columns: {
                id: {
                    title: 'ID',
                    type: 'number',
                },
                first_name: {
                    title: 'First Name',
                    type: 'string',
                },
                last_name: {
                    title: 'Last Name',
                    type: 'string',
                },
                email: {
                    title: 'Email',
                    type: 'string',
                },
            },
        },
        onEditButtonClick: ($event) => {
            this.router.navigate(['user','edit', $event.data.id]);
        },
        onDeleteButtonClick: ($event) => {
            console.log("onCreateButtonClick", $event);
        },
        onCreateButtonClick: () => {
            this.router.navigate(['user','new']);
        }
    });

    constructor(
        private datastore: WebAngularDataStore,
        private router: Router,
    ) {

    }

}
