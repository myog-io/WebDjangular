import {Component, OnInit} from '@angular/core';
import {PluginProviderAbstractPricingComponent} from "../../../plans/pricing/abstract-pricing.component";
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {WebAngularDataStore} from "@webdjangular/core/services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'plugin-provider-checkout-plan-telephone',
    templateUrl: './telephone.component.html',
    styleUrls: ['./telephone.component.scss']
})
export class PluginProviderCheckoutPlanTelephoneComponent extends PluginProviderAbstractPricingComponent {

  constructor(public providerCheckout: ProviderCheckoutService,
              public datastore: WebAngularDataStore,
              public modalService: NgbModal) {
    super(datastore, modalService);
  }



}

