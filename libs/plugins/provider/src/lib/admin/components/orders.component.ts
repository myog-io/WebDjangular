import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WebAngularDataStore} from "@core/services/src/lib/WebAngularDataStore.service";
import {NbDialogService} from "@nebular/theme";
import {OrderModel} from "@plugins/store/src/lib/data/models/Order.model";
import {ErrorResponse} from "angular2-jsonapi";


@Component({
  selector: 'plugin-provider-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class PluginProviderAdminOrdersComponent implements OnInit {

  private order: OrderModel;


  constructor(private activatedRoute: ActivatedRoute,
              private datastore: WebAngularDataStore,
              private router: Router,
              private dialogService: NbDialogService) {
    this.activatedRoute.params.subscribe((params: object) => {
      if (params['id']) {
        this.datastore.findRecord(OrderModel, params['id'], {
            //fields: 'id,order_num,user_email,lines',
            include: [
              "lines", "lines.product"
            ].join(',')
          }
        ).subscribe(
          (order: OrderModel) => {
            this.order = order;
            console.log(order);
          },
          (error: ErrorResponse) => {

          }
        )
      }
    })

  }

  ngOnInit(): void {
  }


}
