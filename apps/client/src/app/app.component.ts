import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WDAConfig, AnalyticsService } from '@webdjangular/core/services';


@Component({
  selector: 'wda-root',
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
