import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'plugin-provider-checkout-plan-internet-optional',
    templateUrl: './optional.component.html',
    styleUrls: ['./optional.component.scss'],
    host: {'class': 'row'}
})
export class PluginProviderCheckoutPlanInternetOptionalComponent implements OnInit {

    @Input()
    icon_code: string;


    @Input()
    title: string;

    @Input()
    description: string;

    @Input()
    price: number;

    @Input()
    currency_unit: string;

    constructor() {
    }

    ngOnInit() {
    }

}
