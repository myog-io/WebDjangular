import { Component, Input } from '@angular/core';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { ThemeProviderfyModalChannelsComponent } from '@themes/providerfy/src/lib/components/modal/channels/channels.component';

@Component({
  selector: 'plugin-provider-plan-pricing-tv-vertical',
  templateUrl: './tv-vertical.component.html',
  styleUrls: ['./tv-vertical.component.scss']
})
export class PluginProviderPricingTvVerticalComponent extends PluginProviderAbstractPricingComponent {
  @Input() class = 'pr-1 pl-1 col-12 col-sm-6 col-lg-3 col-xs-12';

  //public loadingChannels = true;
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal
  ) {
    super(datastore, modalService);
  }

  openChannelListModel(product_id: string = '') {
    const modalChannelList = this.modalService.open(
      ThemeProviderfyModalChannelsComponent,
      {
        size: 'lg',
        centered: true,
        windowClass: 'modal-channel-list'
      }
    );
    modalChannelList.componentInstance.product_id = product_id;
  }
}
