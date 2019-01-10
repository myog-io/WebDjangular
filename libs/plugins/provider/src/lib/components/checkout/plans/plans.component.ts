import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../data/services/provider-checkout.service";


@Component({
  selector: 'plugin-provider-checkout-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  host: {'class': 'col-12 col-md-7 col-lg-8'}
})
export class PluginProviderCheckoutPlansComponent implements OnInit {

  providerCheckout: ProviderCheckoutService;

  constructor(providerCheckout: ProviderCheckoutService) {
    this.providerCheckout = providerCheckout;
  }

  ngOnInit() {
  }



}
