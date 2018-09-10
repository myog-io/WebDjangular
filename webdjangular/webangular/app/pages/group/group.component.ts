import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router";

import { WebAngularDataStore } from '../../@core/data/data-store/WebAngularDataStore.service';
import { WebAngularSmartTableDataSource } from '../../@core/data/data-store/WebAngularSmartTableDataSource';

import { GroupModel } from '../../@core/data/models/Group.model';

@Component({
    selector: 'webdjangular-group',
    styleUrls: ['./group.component.scss'],
    templateUrl: './group.component.html',
})
export class GroupComponent{

    source: WebAngularSmartTableDataSource  = new WebAngularSmartTableDataSource(this.datastore, GroupModel, {
        smartTableSettings: {
            columns: {
                id: {
                    title: 'ID',
                    type: 'number',
                },
                name: {
                    title: 'Name',
                    type: 'string',
                },
            },
        },
        onEditButtonClick: ($event) => {
            this.router.navigate(['group','edit', $event.data.id]);
        },
        onDeleteButtonClick: ($event) => {
            console.log("onCreateButtonClick", $event);
        },
        onCreateButtonClick: () => {
            this.router.navigate(['group','new']);
        }
    });

    constructor(
        private datastore: WebAngularDataStore,
        private router: Router,
    ) {

    }

}
