import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'plugin-provider-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PluginProviderPlansComponent implements OnInit {

  @Input() title: string = '';
  @Input() titleColor: string = '';
  @Input() headline: string = '';
  @Input() background: string = '';
  @Input() title_id: string = 'provider-plan';

  constructor() {
  }

  ngOnInit() {
  }

}
