import { Component, OnInit } from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {CartModel} from "@plugins/store/src/lib/data/models/Cart.model";

@Component({
  selector: 'plugin-provider-checkout-wizard-step03',
  templateUrl: './step03.component.html',
  styleUrls: ['./step03.component.scss']
})
export class PluginProviderCheckoutWizardStep03Component implements OnInit {

  public cart: CartModel;

  constructor(public providerCheckout: ProviderCheckoutService) { }

  ngOnInit() {
    this.cart = this.providerCheckout.cartService.cart;
  }

}
