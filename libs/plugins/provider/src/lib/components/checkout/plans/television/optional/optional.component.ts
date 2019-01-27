import {Component, Input} from '@angular/core';
import {ProviderCheckoutService} from "../../../../../data/services/provider-checkout.service";
import {ProductModel} from "@plugins/store/src/lib/data/models/Product.model";

@Component({
  selector: 'plugin-provider-checkout-plan-television-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.scss'],
  host: {'class': 'col-12 col-sm-6 col-lg-4'}
})
export class PluginProviderCheckoutPlanTelevisionOptionalComponent {

  @Input() plan: ProductModel;

  constructor( public providerCheckout: ProviderCheckoutService) {

  }


}
