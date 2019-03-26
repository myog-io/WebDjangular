import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { NbDialogService } from '@nebular/theme';
import { OrderModel } from '@plugins/store/src/lib/data/models/Order.model';
import { ErrorResponse } from 'angular2-jsonapi';
import { PlanTypeModel } from '../../data/models/PlanType.model';
import { ResellerModel } from '../../data';

@Component({
  selector: 'plugin-provider-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class PluginProviderAdminOrdersComponent implements OnInit {
  public order: OrderModel;
  public customer_type: string;
  public tipo_de_acesso: string;
  public fidelidade: string;
  public revendedor: string;
  public plan_type: PlanTypeModel;
  public reseller: ResellerModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datastore: WebAngularDataStore,
    private router: Router,
    private dialogService: NbDialogService
  ) {
    this.activatedRoute.params.subscribe((params: object) => {
      if (params['id']) {
        this.datastore
          .findRecord(OrderModel, params['id'], {
            //fields: 'id,order_num,user_email,lines',
            include: ['lines', 'lines.product'].join(',')
          })
          .subscribe(
            (order: OrderModel) => {
              this.order = order;
              this.loadData();
            },
            (error: ErrorResponse) => { }
          );
      }
    });
  }

  ngOnInit(): void {


  }
  loadData(): void {
    switch (this.order.extra_data.customer_typ) {
      case 'new':
        this.customer_type = "Novo cliente";
        break;
      case 'internet_fibra':
        this.customer_type = "Cliente Fibra";
        break;
      default:
        this.customer_type = "Cliente Rádio"
        break;
    }
    if (this.order.extra_data.plan_type_id) {
      this.datastore.findRecord(PlanTypeModel, this.order.extra_data.plan_type_id).subscribe((data) => {
        this.plan_type = data;
        this.tipo_de_acesso = this.plan_type.name;
      })
    }
    if (this.order.extra_data.reseller_id) {
      this.datastore.findRecord(ResellerModel, this.order.extra_data.reseller_id).subscribe((res) => {
        this.reseller = res;
        this.revendedor = `${this.reseller.name} <${this.reseller.email}>`;
      })
    }
    switch (this.order.extra_data.contractTime) {
      case '2':
        this.fidelidade = "2 anos";
        break;
      case '1':
        this.fidelidade = "1 ano";
        break;
      default:
        this.fidelidade = "Sem fidelidade";
        break;
    }
    // TODO: Plan Type and Resellers
    console.log(this.order.extra_data)
  }
}
