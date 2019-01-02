import { Component, OnInit } from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";

@Component({
  selector: 'plugin-provider-checkout-wizard-step01',
  templateUrl: './step01.component.html',
  styleUrls: ['./step01.component.scss']
})
export class PluginProviderCheckoutWizardStep01Component implements OnInit {

  constructor(public providerCheckout: ProviderCheckoutService) { }

  ngOnInit() {
  }

}
