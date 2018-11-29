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
    current_model: any;
    base_path: any;
    form: any;
    title: string = ";D";

    constructor(
        private route: ActivatedRoute,
        private datastore: WebAngularDataStore,
        private router: Router,
       ) {

    }
    ngOnInit(): void {
        this.current_model = this.route.data['value'].model;
        this.title = this.route.data['value'].title;
        this.base_path = this.route.data['value'].path;
        this.form = new this.current_model.formClassRef();
        this.startTableInformation()

    }

    startTableInformation(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        this.source = new WebAngularSmartTableDataSource(this.datastore, this.current_model, {
            smartTableSettings: this.form.listingTableSettings,
            onEditButtonClick: ($event) => {
                this.router.navigate([this.base_path,'edit', $event.data.pk]);
            },
            onDeleteButtonClick: ($event) => {
                // TODO ALERTTTTT
                this.datastore.deleteRecord(this.current_model, $event.data.pk).subscribe(
                    (r) => {
                        this.source.remove($event)
                    }
                );
            },
            onCreateButtonClick: () => {
                this.router.navigate([this.base_path,'new']);
            }
        });

    }

}
