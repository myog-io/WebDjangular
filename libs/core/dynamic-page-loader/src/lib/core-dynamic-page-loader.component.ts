import { Component, ViewChild, ViewContainerRef, AfterViewInit, Compiler, ComponentRef, Injector } from '@angular/core';
import { UrlSegment, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { WDAConfig } from '@webdjangular/core/services';
import { CoreDynamicComponentLoader } from '@webdjangular/core/dynamic-component-loader';
import { ThemesCleanModule } from '@webdjangular/themes/clean';

@Component({
  selector: 'webdjangular-dynamic-page-loader',
  template: `
      <div #bodyContainer></div>
  `,
})
export class CoreDynamicPageLoaderComponent implements AfterViewInit {
  private url = null;
  private domain = null;
  private paramSubscription;
  private links = []
  private bodyRef: ComponentRef<{}>;
  @ViewChild('bodyContainer', { read: ViewContainerRef }) bodyContainer: ViewContainerRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wdaConfig: WDAConfig,
    private componentLoader: CoreDynamicComponentLoader,
    private compiler: Compiler,
    private injector: Injector) {
      this.links.push({path: '**', pathMatch: 'full', component: CoreDynamicPageLoaderComponent});

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

  private getPageContent(data:any){
    const metadata = {
      selector: 'wda-body',
      template: data.content
    }
    const factory = this.componentLoader.createComponentFactorySync(metadata, null,this.compiler)
    data.bodyFactory = factory;
    return data;
  }
  private addLinkToRoute(path: any, data: any){
    // TODO Check if link already has poath
    // Removing Last From Link
    data = this.getPageContent(data);

    const last = this.links.pop();
    this.links.push({
      path: path.join(),
      pathMatch: 'full',
      loadChildren: () => ThemesCleanModule,//'@webdjangular/themes/clean#ThemesCleanModule',//this.wdaConfig.getThemePath(),
      data: data
    })

    // Putting Last in correct Order
    this.links.push(last);

    this.router.resetConfig(this.links);
    this.router.navigate(path);
  }
  private HomePage() {
    this.wdaConfig.getHome().then(data => {
      //this.addLinkToRoute([''],data)
      data = this.getPageContent(data);
      if (this.bodyRef) {
        this.bodyRef.destroy();
        this.bodyRef = null;
      }
      this.bodyContainer.clear();
      this.bodyRef = this.bodyContainer.createComponent(data.bodyFactory, 0, this.injector);
      //this.loadComponent('page', data);
      // TODO: LOAD ERROR 500 or 400
    })
  }
  private LoadPages(segments: UrlSegment[]) {
    this.wdaConfig.getPage(segments).then(data => {
      //this.loadComponent('page', data);
      // TODO: LOAD ERROR 500 or 400
      //this.addLinkToRoute(segments,data)
      data = this.getPageContent(data);
      if (this.bodyRef) {
        this.bodyRef.destroy();
        this.bodyRef = null;
      }
      this.bodyContainer.clear();
      this.bodyRef = this.bodyContainer.createComponent(data.bodyFactory, 0, this.injector)
    })
  }
}
