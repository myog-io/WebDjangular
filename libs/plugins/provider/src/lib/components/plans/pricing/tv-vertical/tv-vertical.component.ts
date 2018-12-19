import { Component, OnInit } from '@angular/core';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plugin-provider-plan-pricing-tv-vertical',
  templateUrl: './tv-vertical.component.html',
  styleUrls: ['./tv-vertical.component.scss']
})
export class PluginProviderPricingTvVerticalComponent extends PluginProviderAbstractPricingComponent {
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
    super(datastore, modalService)
  }

}
