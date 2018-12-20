import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";

@Component({
    selector: 'plugin-provider-checkout-plan-internet',
    templateUrl: './internet.component.html',
    styleUrls: ['./internet.component.scss'],
    host: {'class': 'col col-md-6 col-sm-12'}
})
export class PluginProviderCheckoutPlanInternetComponent implements OnInit {

    providerCheckout: ProviderCheckoutService;

    constructor(providerCheckout: ProviderCheckoutService) {
      this.providerCheckout = providerCheckout;
    }

    ngOnInit() {
    }

    selectPlan() {
      this.providerCheckout.selected_internet_plan = {
        name: "40 MEGA",
        price: "104,90",
      }
    }


}
