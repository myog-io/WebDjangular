import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { UrlSegment, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { WDAConfig } from '@webdjangular/core/services';
import { CoreDynamicComponentLoader } from '@webdjangular/core/dynamic-component-loader';


@Component({
  selector: 'webdjangular-dynamic-page-loader',
  template: `
    <div #componentOutlet></div>
  `,
})
export class CoreDynamicPageLoaderComponent implements AfterViewInit {
  private url = null;
  private domain = null;
  private paramSubscription;

  @ViewChild('componentOutlet', { read: ViewContainerRef }) componentOutlet: ViewContainerRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wdaConfig: WDAConfig,
    private componentLoader: CoreDynamicComponentLoader) {

  }
  async ngAfterViewInit() {
    this.domain = document.location.hostname;
    this.url = document.location.protocol + '//' + this.domain;
    this.activatedRoute.url.subscribe((segments: UrlSegment[]) => {
      if (segments.length <= 0) {
        this.HomePage();
      } else {
        this.LoadPages(segments);
      }
    });
  }

  private loadComponent(component_id: string, data: any) {
    console.log(this.wdaConfig.getThemePath());

    this.componentLoader
      .getComponentFactory<any>(this.wdaConfig.getThemePath())
      //.getComponentFactory<any>("@webdjangular/themes/clean#ThemesCleanModule")
      //.getComponentFactory<any>("@webdjangular/themes/clean#ThemesCleanModule")
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
      this.loadComponent('page', data);
      // TODO: LOAD ERROR 500 or 400
    })
  }
  private LoadPages(segments: UrlSegment[]) {
    this.wdaConfig.getPage(segments).then(data => {
      this.loadComponent('page', data);
      // TODO: LOAD ERROR 500 or 400
    })
  }
}
