import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'plugin-provider-checkout-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    host: {'class': 'col col-md-4'}
})
export class PluginProviderCheckoutSummaryComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
