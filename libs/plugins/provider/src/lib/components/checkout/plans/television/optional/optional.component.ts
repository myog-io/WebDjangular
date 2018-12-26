import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'plugin-provider-checkout-plan-television-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.scss'],
  host: {'class': 'col col-md-4'}
})
export class PluginProviderCheckoutPlanTelevisionOptionalComponent implements OnInit {

  @Input() plan;

  constructor() {
  }

  ngOnInit() {
  }

}
