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
  @Input() class = 'pr-1 pl-1 col-md-3 col-xs-12';
  //public include = 'channels'
  public loadingChannels = true;
  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
    super(datastore, modalService)
    this.entriesChanged.subscribe((entries) => {
      this.loadingChannels = true;
      this.loadChannelsRecursive().then((channels)=>{

        for (let i = 0; i < this.entries.length; i++) {
          this.entries[i].channels = channels.filter((channel) => channel.products_id && channel.products_id.indexOf(this.entries[i].id) !== -1);
          this.entries[i].channels_hd = this.entries[i].channels.filter((channels) => channels.types.indexOf("HD") !== -1);
        }
        this.loadingChannels = false;
      });
    });
  }
  public loadChannelsRecursive(page = 1):Promise<ChannelModel[]>{

    return new Promise((resolve,reject)=>{
      this.datastore.findAll(ChannelModel,{page:{size:100,number:page}}).subscribe((query:JsonApiQueryData<ChannelModel>) => {
        const channels = query.getModels();
        this.loading = false;
        if (page < query.getMeta().meta.pagination.pages) {
          page++;

          this.loadChannelsRecursive(page).then((new_channels) => {
            resolve(channels.concat(new_channels));
          })
        }else{
          resolve(channels)
        }
      })
    })

  }

}
