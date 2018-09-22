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
        console.log("URL",this.activatedRoute.url['value']);
        console.log("params",this.activatedRoute.params['value']);
        
        activatedRoute.url.subscribe((segments: UrlSegment[]) => {
            console.log("SEGMENTS????",segments)
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
        console.log("NOW LOAD OTHER FUCKING PAGE", segments);
        this.wdaConfig.getPages(segments).then(data => {
            console.log(data)
        }
        )
    }
}
