import { Component, Input } from '@angular/core';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';

@Component({
  selector: 'plugin-provider-plan-pricing-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.scss']
})
export class PluginProviderPricingInternetComponent extends PluginProviderAbstractPricingComponent {
  @Input() discount: number = 0;
  @Input() class = "entry col-12 col-md-3 px-1 py-0 m-0";
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal,
    public wdaConfig: WDAConfig,
  ) {
    super(datastore, modalService, wdaConfig);
  }
}

