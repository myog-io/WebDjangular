import { Component, Input ,OnInit } from '@angular/core';

@Component({
  selector: 'plugin-provider-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PluginProviderPlansComponent implements OnInit {

  @Input() title: string = '';
  @Input() headline: string = '';



  constructor() { }

  ngOnInit() {
  }

}
