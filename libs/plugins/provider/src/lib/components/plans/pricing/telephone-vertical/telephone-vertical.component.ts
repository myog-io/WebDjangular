import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';

@Component({
    selector: 'plugin-provider-plan-pricing-telephone-vertical',
    templateUrl: './telephone-vertical.component.html',
    styleUrls: ['./telephone-vertical.component.scss'],
    //encapsulation: ViewEncapsulation.None,
})
export class PluginProviderPricingTelephoneVerticalComponent extends PluginProviderAbstractPricingComponent {
  @Input() class = "col col-md-4 col-xs-12";
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
    super(datastore, modalService)
  }

}
