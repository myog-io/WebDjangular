import { Component, OnInit } from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";

@Component({
  selector: 'plugin-provider-checkout-wizard-step03',
  templateUrl: './step03.component.html',
  styleUrls: ['./step03.component.scss']
})
export class PluginProviderCheckoutWizardStep03Component implements OnInit {

  constructor(public providerCheckout: ProviderCheckoutService) { }

  ngOnInit() {
  }

}
