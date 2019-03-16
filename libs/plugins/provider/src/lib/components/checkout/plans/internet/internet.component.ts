import { Component } from '@angular/core';
import { ProviderCheckoutService } from '../../../../data/services/provider-checkout.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plugin-provider-checkout-plan-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.scss']
})
export class PluginProviderCheckoutPlanInternetComponent {
  constructor(
    public providerCheckout: ProviderCheckoutService,
    public modalService: NgbModal
  ) {}
}
