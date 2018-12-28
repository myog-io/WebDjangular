import { Component, Input } from '@angular/core';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plugin-provider-plan-pricing-internet-vertical',
  templateUrl: './internet-vertical.component.html',
  styleUrls: ['./internet-vertical.component.scss']
})
export class PluginProviderPricingInternetVerticalComponent extends PluginProviderAbstractPricingComponent {
  @Input() class = "col-10 offset-1 col-md-3 offset-md-0";
  @Input() discount:number = 0;
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
    super(datastore, modalService)
  }

}
