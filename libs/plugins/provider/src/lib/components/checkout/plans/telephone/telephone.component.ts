import {Component} from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'plugin-provider-checkout-plan-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.scss']
})
export class PluginProviderCheckoutPlanTelephoneComponent {

  constructor(public providerCheckout: ProviderCheckoutService,
              public modalService: NgbModal) {
  }


}

