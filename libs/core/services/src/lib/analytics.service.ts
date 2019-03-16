import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';

declare const ga: any;

export interface GoogleAnalytic {
  trackingId: string;
  domain: string;
}

@Injectable()
export class AnalyticsService {
  public googleAnalytic: GoogleAnalytic = null;

  constructor(
    private location: Location,
    private router: Router,
    private wdaConfig: WDAConfig,
    @Inject(DOCUMENT) public document
  ) {
    this.wdaConfig.getCoreConfig('analytics_core').then(data => {
      if (
        data &&
        data.hasOwnProperty('ga_tracking_id') &&
        data['ga_tracking_id']
      ) {
        this.googleAnalytic = {
          trackingId: data['ga_tracking_id'],
          domain: data['ga_domain'] ? data['ga_domain'] : 'auto'
        };
        this.GACreateSession();
        this.trackPageViews();
      }
      //this.trackPageViews();
    });
  }

  trackPageViews() {
    if (this.googleAnalytic) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          ga('send', { hitType: 'pageview', page: this.location.path() });
        });
    }
  }

  trackEvent(eventName: string) {
    if (this.googleAnalytic) {
      ga('send', 'event', eventName);
    }
  }

  // GOOGLE ANALYTICS
  GACreateSession(): void {
    let ga_script = document.createElement('script');
    ga_script.text = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                      
                      ga("create", "${this.googleAnalytic.trackingId}" , "${
      this.googleAnalytic.domain
    }");`;

    document.head.appendChild(ga_script);
  }
}
