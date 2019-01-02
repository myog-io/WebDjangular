import {Component, Input} from '@angular/core';
import {ProviderCheckoutService} from "../../../../../data/services/provider-checkout.service";

@Component({
  selector: 'plugin-provider-checkout-plan-television-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.scss'],
  host: {'class': 'col-12 col-sm-6 col-lg-4'}
})
export class PluginProviderCheckoutPlanTelevisionOptionalComponent {

  @Input() plan;

  constructor( public providerCheckout: ProviderCheckoutService) {

  }


}
