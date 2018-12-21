import {Component, OnInit} from '@angular/core';
import {WebAngularDataStore} from "@webdjangular/core/services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PluginProviderAbstractPricingComponent} from "../../../plans/pricing/abstract-pricing.component";
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";

@Component({
  selector: 'plugin-provider-checkout-plan-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.scss'],
})
export class PluginProviderCheckoutPlanTelevisionComponent extends PluginProviderAbstractPricingComponent {

  constructor(public providerCheckout: ProviderCheckoutService,
              public datastore: WebAngularDataStore,
              public modalService: NgbModal) {
    super(datastore, modalService);
  }



}








