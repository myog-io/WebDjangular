import { Component, OnInit, Input } from '@angular/core';
import { PluginProviderAbstractPricingComponent } from '../abstract-pricing.component';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChannelModel } from '../../../../data/models/Channel.model';
import { JsonApiQueryData } from 'angular2-jsonapi';

@Component({
  selector: 'plugin-provider-plan-pricing-tv-vertical',
  templateUrl: './tv-vertical.component.html',
  styleUrls: ['./tv-vertical.component.scss']
})
export class PluginProviderPricingTvVerticalComponent extends PluginProviderAbstractPricingComponent {
  @Input() class = 'pr-1 pl-1 col-12 col-sm-6 col-lg-3 col-xs-12';
  //public include = 'channels'
  //public loadingChannels = true;
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
    super(datastore, modalService);
  }
}
