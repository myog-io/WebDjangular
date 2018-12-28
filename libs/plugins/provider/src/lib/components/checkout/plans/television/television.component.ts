import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";

@Component({
  selector: 'plugin-provider-checkout-plan-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.scss']
})
export class PluginProviderCheckoutPlanTelevisionComponent {

  constructor(public providerCheckout: ProviderCheckoutService,
              public modalService: NgbModal) {
  }


}








