import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../data/services/provider-checkout.service";

@Component({
    selector: 'plugin-provider-checkout-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    host: {'class': 'col col-md-4'}
})
export class PluginProviderCheckoutSummaryComponent implements OnInit {

    providerCheckout: ProviderCheckoutService;

    constructor(providerCheckout: ProviderCheckoutService) {
      this.providerCheckout = providerCheckout;
    }

    ngOnInit() {
    }

}
