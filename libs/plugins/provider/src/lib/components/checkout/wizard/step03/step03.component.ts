import { Component, OnInit } from '@angular/core';
import { ProviderCheckoutService } from '../../../../data/services/provider-checkout.service';
import { CartModel } from '@plugins/store/src/lib/data/models/Cart.model';
import { CartItemModel } from '@plugins/store/src/lib/data/models/CartItem.model';

@Component({
  selector: 'plugin-provider-checkout-wizard-step03',
  templateUrl: './step03.component.html',
  styleUrls: ['./step03.component.scss']
})
export class PluginProviderCheckoutWizardStep03Component implements OnInit {
  public cart: CartModel;

  //public seac_items: CartItemModel[] = [];
  public seac_price: number = 0;

  //public stfc_items: CartItemModel[] = [];
  public stfc_price: number = 0;

  //public sva_n_scm_items: CartItemModel[] = [];
  public sva_price: number = 0;
  public scm_price: number = 0;

  constructor(public providerCheckout: ProviderCheckoutService) { }

  ngOnInit() {
    this.cart = this.providerCheckout.cartService.cart;
    const providerConfig = this.providerCheckout.providerConfig;
    //console.log(providerConfig);
    let total: number = 0;

    let item: CartItemModel;
    for (item of this.cart.items) {
      if (item.product) {
        let show_price: boolean = true;
        if (
          providerConfig.seac_codes.find(
            id => id == item.product.product_type.id
          )
        ) {
          //this.seac_items.push(item);
          this.seac_price += item.getTotal();
          show_price = false;
        }
        if (
          providerConfig.stfc_codes.find(
            id => id == item.product.product_type.id
          )
        ) {
          //this.stfc_items.push(item);
          this.stfc_price += item.getTotal();
          show_price = false;
        }
        if (
          providerConfig.sva_scm_codes.find(
            id => id == item.product.product_type.id
          )
        ) {
          //this.sva_n_scm_items.push(item);
          this.sva_price += item.getTotal() * (providerConfig.sva_total / 100);
          this.scm_price += item.getTotal() * (providerConfig.scm_total / 100);
          show_price = false;
        }
        item.data['show_price'] = show_price;
      }
    }

    //console.log('sva_price:', this.sva_price);
    //console.log('scm_price:', this.scm_price);
    //console.log('seac_price:', this.seac_price);
    //console.log('stfc_price:', this.stfc_price);
    //console.log('subtotal:', this.cart.subtotal);
    //console.log('total:', total);
  }
}
