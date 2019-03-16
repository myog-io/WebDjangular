import { Component, OnInit, Input } from '@angular/core';
import { ProviderCheckoutService } from '../../../data/services/provider-checkout.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PluginProviderDialogComponent } from '../../dialog.component';
import { BlockModel } from '@core/cms/src/lib/models';

@Component({
  selector: 'plugin-provider-checkout-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  host: { class: 'col-12 col-md-5 col-lg-4' }
})
export class PluginProviderCheckoutSummaryComponent implements OnInit {
  providerCheckout: ProviderCheckoutService;
  @Input() custom_block: BlockModel;
  constructor(
    providerCheckout: ProviderCheckoutService,
    //protected dialogRef: NbDialogRef<any>,
    //private dialogService: NbDialogService,
    private _modalService: NgbModal
  ) {
    this.providerCheckout = providerCheckout;
  }

  ngOnInit() {}

  submit() {
    if (
      this.providerCheckout.cartService.cart.extra_data.customer_type ===
        'new' &&
      !this.providerCheckout.selected_internet_plan
    ) {
      let modalRef = this._modalService.open(PluginProviderDialogComponent, {
        size: 'sm',
        centered: true
      });
      modalRef.componentInstance.title = 'Escolher plano de Internet';
      modalRef.componentInstance.body = `A Escolha de um plano de internet é obrigatória para novos clientes, por favor escolha seu plano.`;
    } else {
      this.providerCheckout.onBuildingPlanSubmit();
    }
  }
}
