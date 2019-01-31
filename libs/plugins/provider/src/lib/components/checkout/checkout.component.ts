import { Component, OnInit, Input } from '@angular/core';
import { ProviderCheckoutService, ProviderCheckoutSteps } from "../../data/services/provider-checkout.service";
import { ActivatedRoute } from "@angular/router";
import { BlockModel } from '@core/cms/src/lib/models';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'plugin-provider-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class PluginProviderCheckoutComponent implements OnInit {

  @Input() cutom_block_id: string;
  public custom_block: BlockModel
  public providerCheckoutSteps = ProviderCheckoutSteps;

  constructor(
    public providerCheckout: ProviderCheckoutService,
    private datastore: WebAngularDataStore,
  ) {

  }

  ngOnInit() {
    if (this.cutom_block_id) {
      this.datastore.findRecord(BlockModel, 
        this.cutom_block_id, { fields: 'content,id' }, 
        new HttpHeaders({ 'Authentication': 'none' })).subscribe(
          (block) => {
            this.custom_block = block;
          }
      );
    }
  }

}
