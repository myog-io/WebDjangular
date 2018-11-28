import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { WebAngularDataStore } from '@webdjangular/core/services';
import { WebAngularSmartTableDataSource } from "@webdjangular/core/data";


@Component({
    selector: 'wda-scaffold',
    styleUrls: ['./scaffold.component.scss'],
    templateUrl: './scaffold.component.html',
})
export class ScaffoldComponent implements OnInit{
    source: WebAngularSmartTableDataSource;
    currentModel: any;
    basePath: any;
    form: any;
    title: string = ";D";

    constructor(
        private route: ActivatedRoute,
        private datastore: WebAngularDataStore,
        private router: Router,
       ) {

    }
    ngOnInit(): void {
        this.currentModel = this.route.data['value'].model;
        this.title = this.route.data['value'].title;
        this.basePath = this.route.data['value'].path;
        this.form = new this.currentModel.formClassRef();
        this.startTableInformation()

    }

    startTableInformation(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        this.source = new WebAngularSmartTableDataSource(this.datastore, this.currentModel, {
            smartTableSettings: this.form.listingTableSettings,
            onEditButtonClick: ($event) => {
                this.router.navigate([this.basePath,'edit', $event.data.pk]);
            },
            onDeleteButtonClick: ($event) => {
                // TODO ALERTTTTT
                this.datastore.deleteRecord(this.currentModel, $event.data.pk).subscribe(
                    (r) => {
                        this.source.remove($event)
                    }
                );
            },
            onCreateButtonClick: () => {
                this.router.navigate([this.basePath,'new']);
            }
        });

    }

}
