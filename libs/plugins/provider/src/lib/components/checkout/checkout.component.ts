import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService, ProviderCheckoutSteps} from "../../data/services/provider-checkout.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'plugin-provider-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class PluginProviderCheckoutComponent implements OnInit {

  public providerCheckoutSteps = ProviderCheckoutSteps;

  constructor(public providerCheckout: ProviderCheckoutService) {

  }

  ngOnInit() {
    
  }

}
