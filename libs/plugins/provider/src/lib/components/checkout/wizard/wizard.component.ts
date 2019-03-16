import { Component, OnInit } from '@angular/core';
import { ProviderCheckoutService } from '../../../data/services/provider-checkout.service';

@Component({
  selector: 'plugin-provider-checkout-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class PluginProviderCheckoutWizardComponent implements OnInit {
  constructor(public providerCheckout: ProviderCheckoutService) {}

  ngOnInit() {}
}
