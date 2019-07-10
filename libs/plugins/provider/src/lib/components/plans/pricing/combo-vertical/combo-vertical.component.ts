import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ProductModel } from 'libs/plugins/store/src/lib/data/models/Product.model';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'plugin-provider-plan-pricing-combo-vertical',
  templateUrl: './combo-vertical.component.html',
  styleUrls: ['./combo-vertical.component.scss']
})
export class PluginPricingComboVerticalComponent implements OnInit, OnDestroy {
  @Input() sku_net: string;
  @Input() sku_tv: string;
  @Input() sku_phone: string;
  @Input() total: number | string;
  @Input() internet_call = 'FIBRA';
  @Input() tv_call = '50% DESCONTO';
  @Input() class = 'col-12 col-sm-6 col-md-6 col-lg-3 p-1';
  @Input() btn_call = 'QUERO ESTE';
  @Input() show_discount: boolean = true;
  loading = true;
  net: ProductModel;
  tv: ProductModel;
  phone: ProductModel;
  sub: Subscription;
  full_price: number | string;

  constructor(private datastore: WebAngularDataStore) { }

  ngOnInit() {
    let options = {};
    options['page'] = { number: 1, size: 3 };

    let skus = [];
    if (this.sku_net) skus.push(this.sku_net);
    if (this.sku_tv) skus.push(this.sku_tv);
    if (this.sku_phone) skus.push(this.sku_phone);
    this.show_discount = Boolean(this.show_discount);
    options['sku__in'] = skus.join(',');
    this.sub = this.datastore
      .findAll(ProductModel, options)
      .subscribe(query => {
        let entries: ProductModel[] = query.getModels();
        this.net = entries.find(product => product.sku == this.sku_net);
        this.tv = entries.find(product => product.sku == this.sku_tv);
        this.phone = entries.find(product => product.sku == this.sku_phone);
        let price = 0;
        if (this.net && this.net.price) {
          price += parseFloat(this.net.price.toString());
        }
        if (this.tv && this.tv.price) {
          price += parseFloat(this.tv.price.toString());
        }
        if (this.phone && this.phone.price) {
          price += parseFloat(this.phone.price.toString());
        }

        if (!this.total) {
          this.total = price.toFixed(2);
        }
        this.full_price = price.toFixed(2);
        //this.total = (<number>this.total).toFixed(2);
        // TODO: Discount Should be based on the cart, but for now is very hard to do this
        //total = "133.90"

        this.loading = false;
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
}
