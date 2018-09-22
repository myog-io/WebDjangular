import { Component } from '@angular/core';
import { UrlSegment, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { WDAConfig } from '../@core/services/wda-config.service';


@Component({
    selector: 'wda-urls',
    template: `
    <router-outlet></router-outlet>
  `,
})
export class UrlsComponent {
    private url = null;
    private domain = null;
    private paramSubscription;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private wdaConfig: WDAConfig)
    {
        this.domain = document.location.hostname;
        this.url = document.location.protocol + '//' + this.domain;
        activatedRoute.url.subscribe((segments: UrlSegment[]) => {
            if (segments.length <= 0) {
                this.HomePage();
            } else {
                this.LoadPages(segments);
            }
        });
    }

    private HomePage() {
        this.wdaConfig.getHome().then(data => {
            console.log(data)
        }
        )
    }
    private LoadPages(segments: UrlSegment[]) {
        this.wdaConfig.getPages(segments).then(data => {
            console.log(data)
        }
        )
    }
}
