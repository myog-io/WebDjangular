import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'plugin-provider-plan-pricing-internet-horizontal',
  templateUrl: './internet-horizontal.component.html',
  styleUrls: ['./internet-horizontal.component.scss']
})
export class PluginProviderPricingInternetHorizontalComponent implements OnInit {

  @Input() name = '';
  @Input() downloadMbps = '';
  @Input() uploaadMbps = '';
  @Input() price = '';


  constructor() {
  }

  ngOnInit() {
  }
}
