import { Component, OnInit } from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";

@Component({
  selector: 'plugin-provider-checkout-wizard-step02',
  templateUrl: './step02.component.html',
  styleUrls: ['./step02.component.scss']
})
export class PluginProviderCheckoutWizardStep02Component implements OnInit {

  constructor(public providerCheckout: ProviderCheckoutService) { }

  ngOnInit() {
  }

}
