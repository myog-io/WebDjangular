import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';
import { AnalyticsService } from '@core/services/src/lib/analytics.service';


@Component({
  selector: 'root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = "Client";
  constructor(private wdaconfig: WDAConfig, private analytics: AnalyticsService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
