import {Component, Input, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../../data/services/provider-checkout.service";
import {ProductModel} from "@plugins/store/src/lib/data/models/Product.model";

@Component({
    selector: 'plugin-provider-checkout-plan-internet-optional',
    templateUrl: './optional.component.html',
    styleUrls: ['./optional.component.scss'],
    host: {'class': 'row'}
})
export class PluginProviderCheckoutPlanInternetOptionalComponent implements OnInit {

    @Input() plan: ProductModel;

    constructor( public providerCheckout: ProviderCheckoutService) {

    }

    ngOnInit() {
    }

}
