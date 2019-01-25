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

  constructor(public providerCheckout: ProviderCheckoutService,
              private route: ActivatedRoute) {

    this.route.queryParams.subscribe(
      (params => {
        if(params['net']){
          providerCheckout.pre_selected_internet_sku = params['net'];
        }
        if(params['tv']){
          providerCheckout.pre_selected_tv_sku = params['tv'];
        }
        if(params['phone']){
          providerCheckout.pre_selected_telephone_sku = params['phone'];
        }
        
      })
    );
  }

  ngOnInit() {
    
  }

}
