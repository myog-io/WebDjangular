import { Component, Input } from '@angular/core';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

@Component({
  selector: 'plugin-provider-plan-pricing-internet-vertical',
  templateUrl: './internet-vertical.component.html',
  styleUrls: ['./internet-vertical.component.scss']
})
export class PluginProviderPricingInternetVerticalComponent extends PluginProviderAbstractPricingComponent {
  @Input() class = "entry col-10 col-md-6 col-lg-3 mx-auto";
  @Input() discount:number = 0;
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
    super(datastore, modalService)
  }

}
