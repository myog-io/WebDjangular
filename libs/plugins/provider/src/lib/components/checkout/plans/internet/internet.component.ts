import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {PluginProviderAbstractPricingComponent} from "../../../plans/pricing/abstract-pricing.component";
import {WebAngularDataStore} from "@webdjangular/core/services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'plugin-provider-checkout-plan-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.scss'],
  host: {'class': 'col col-md-6 col-sm-12'}
})
export class PluginProviderCheckoutPlanInternetComponent extends PluginProviderAbstractPricingComponent {

  providerCheckout: ProviderCheckoutService;

  constructor(providerCheckout: ProviderCheckoutService,
              datastore: WebAngularDataStore,
              modalService: NgbModal) {
    super(datastore, modalService)
  }

  // selectPlan() {
  //   this.providerCheckout.selected_internet_plan = {
  //     name: "40 MEGA",
  //     price: "104,90",
  //   }
  // }


}
