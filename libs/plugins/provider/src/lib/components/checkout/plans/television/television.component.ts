import {Component, OnInit} from '@angular/core';
import {WebAngularDataStore} from "@webdjangular/core/services";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PluginProviderAbstractPricingComponent} from "../../../plans/pricing/abstract-pricing.component";

@Component({
  selector: 'plugin-provider-checkout-plan-television',
  templateUrl: './television.component.html',
  styleUrls: ['./television.component.scss'],
  host: {'class': 'col col-md-6 col-sm-12'}
})
export class PluginProviderCheckoutPlanTelevisionComponent  extends PluginProviderAbstractPricingComponent {

  constructor(public datastore: WebAngularDataStore,
              public modalService: NgbModal) {
    super(datastore, modalService)
  }

}








