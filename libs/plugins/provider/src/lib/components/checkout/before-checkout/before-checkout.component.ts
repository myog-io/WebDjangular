import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../data/services/provider-checkout.service";


@Component({
  selector: 'plugin-provider-checkout-before-checkout',
  templateUrl: './before-checkout.component.html',
  styleUrls: ['./before-checkout.component.scss'],
})
export class PluginProviderCheckoutBeforeCheckoutComponent implements OnInit {

  providerCheckout: ProviderCheckoutService;

  constructor(providerCheckout: ProviderCheckoutService) {
    this.providerCheckout = providerCheckout;
  }

  ngOnInit() {
  }


}
