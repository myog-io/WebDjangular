import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServerResponse } from '@core/services/src/lib/server-response.service';

@Component({
  selector: 'wda-error-404',
  styleUrls: ['./404.component.scss'],
  templateUrl: './404.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PluginProviderError404Component implements OnInit {
  constructor(private serverResponse: ServerResponse) {}

  ngOnInit(): void {
    this.serverResponse.setNotFound('Page Not Found');
  }
}
