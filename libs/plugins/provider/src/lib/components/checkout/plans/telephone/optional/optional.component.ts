import {Component, Input, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../../data/services/provider-checkout.service";

@Component({
    selector: 'plugin-provider-checkout-plan-telephone-optional',
    templateUrl: './optional.component.html',
    styleUrls: ['./optional.component.scss'],
    host: {'class': 'row'}
})
export class PluginProviderCheckoutPlanTelephoneOptionalComponent implements OnInit {

    @Input()
    plan: any;

    constructor( public providerCheckout: ProviderCheckoutService) {

    }

    ngOnInit() {
    }

}