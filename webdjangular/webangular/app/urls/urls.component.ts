import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { UrlSegment, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { WDAConfig } from '../@core/services/wda-config.service';
import { DynamicComponentLoader } from '../dynamic-component-loader/dynamic-component-loader.service';


@Component({
    selector: 'wda-urls',
    template: `
    <div #componentOutlet></div>
  `,
})
export class UrlsComponent {
    private url = null;
    private domain = null;
    private paramSubscription;

    @ViewChild('componentOutlet', {read: ViewContainerRef}) componentOutlet: ViewContainerRef;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private wdaConfig: WDAConfig,
        private componentLoader: DynamicComponentLoader)
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
    private loadComponent(component_id:string,data:any) {
        this.componentLoader
        .getComponentFactory<any>(component_id)
        .subscribe(factory => {
            const ref = this.componentOutlet.createComponent(factory);
            ref.instance.data = data;
            ref.changeDetectorRef.detectChanges();
        }, error => {
            console.warn(error);
        })
    }
    private HomePage() {
        this.wdaConfig.getHome().then(data => {
            this.loadComponent('page',data);
            // TODO: LOAD ERROR 500 or 400
        })
    }
    private LoadPages(segments: UrlSegment[]) {
        this.wdaConfig.getPage(segments).then(data => {
            this.loadComponent('page',data);
            // TODO: LOAD ERROR 500 or 400
        })
    }
}
