import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';
import { ProviderProductModel } from '../../../../data/models/ProviderProduct.model';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

@Component({
    selector: 'plugin-provider-plan-pricing-telephone-vertical',
    templateUrl: './telephone-vertical.component.html',
    styleUrls: ['./telephone-vertical.component.scss'],
    //encapsulation: ViewEncapsulation.None,
})
export class PluginProviderPricingTelephoneVerticalComponent extends PluginProviderAbstractPricingComponent {
  @Input() class = "col-12 col-md-6 col-lg-4";
  model = ProviderProductModel;
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
    super(datastore, modalService)
  }

}
