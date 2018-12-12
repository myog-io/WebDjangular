import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { WebAngularDataStore } from '@webdjangular/core/services';
import { WebAngularSmartTableDataSource } from "@webdjangular/core/data";
import { ProductModel } from "../../data/models/Product.model";


@Component({
  selector: 'wda-store-product',
  template: `<nb-card>
      <nb-card-header>
        Product List
      </nb-card-header>
    </nb-card>

    <ng2-smart-table
      [settings]="source.smartTableSettings"
      [source]="source"
      (create)="source.conf.onCreateButtonClick()"
      (edit)="source.conf.onEditButtonClick($event)"
      (delete)="source.conf.onDeleteButtonClick($event)">
      ></ng2-smart-table>
`
})
export class StoreProductComponent implements OnInit {
  source: WebAngularSmartTableDataSource;
  current_model = ProductModel;
  base_path = '/store/catalog/product/';
  form: any;

  constructor(
    private route: ActivatedRoute,
    private datastore: WebAngularDataStore,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.form = new this.current_model.formClassRef(this.datastore);
    this.startTableInformation()

  }

  startTableInformation(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.source = new WebAngularSmartTableDataSource(this.datastore, this.current_model, {
      smartTableSettings: this.form.listingTableSettings,
      onEditButtonClick: ($event) => {
        this.router.navigate([this.base_path, 'edit', $event.data.pk]);
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
        this.router.navigate([this.base_path, 'new']);
      }
    });

  }

}
