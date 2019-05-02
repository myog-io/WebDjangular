import { Component, Input, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';

@Component({
  selector: 'plugin-provider-plan-pricing-internet-horizontal',
  templateUrl: './internet-horizontal.component.html',
  styleUrls: ['./internet-horizontal.component.scss']
})
export class PluginProviderPricingInternetHorizontalComponent extends PluginProviderAbstractPricingComponent {
  @Input() discount: number = 0;
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal,
    public wdaConfig: WDAConfig,
  ) {
    super(datastore, modalService, wdaConfig);
  }
}
