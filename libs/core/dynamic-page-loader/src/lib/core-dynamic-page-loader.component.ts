import {
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  Compiler,
  ComponentRef,
  Injector,
  ViewEncapsulation,
  Inject
} from '@angular/core';
import { UrlSegment, ActivatedRoute, ParamMap, Router, Scroll, RouterEvent } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { WDAConfig } from '@webdjangular/core/services';
import { CoreDynamicComponentLoader } from '@webdjangular/core/dynamic-component-loader';
import { ThemesCleanModule } from '@webdjangular/themes/clean';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import { CoreDynamicCustomComponent } from 'libs/core/dynamic-component-loader/src/lib/core-dynamic-component-loader.service';

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
  public completeLoadCallback = null;
  @ViewChild('bodyContainer', { read: ViewContainerRef }) bodyContainer: ViewContainerRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wdaConfig: WDAConfig,
    private componentLoader: CoreDynamicComponentLoader,
    private compiler: Compiler,
    private injector: Injector,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.links.push(
      { path: '**', pathMatch: 'full', component: CoreDynamicPageLoaderComponent },
    );

    this.router.events.subscribe((event: any) => {
      if (event.anchor) {
        this.completeLoadCallback = () => {
          this.completeLoadCallback = null;
          let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
            document:this.document,
            scrollTarget: `#${event.anchor}`,
            pageScrollDuration: 350,
          });
          this.pageScrollService.start(pageScrollInstance);

        }
      }
    })

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

  private getPageContent(data: any) {
    const metadata = {
      selector: 'wda-body',
      template: data.content,
      encapsulation: ViewEncapsulation.None
    }
    const factory = this.componentLoader.createComponentFactorySync(metadata, null, this.compiler)
    data.bodyFactory = factory;
    return data;
  }

  private addLinkToRoute(path: any, data: any) {
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
    this.wdaConfig.getHome().then((data: any) => {
      if (data) {
        this.loadPagesContent(data);
      } else {
        // PAGE NOT FOUND
        this.loadPagesContent({
          content: '<wda-error-404></wda-error-404>'
        })
      }
    },
      (error) => {
        if (error.errors.length > 0) {
          if (error.errors[0].status[0] === '4') {
            this.loadPagesContent({
              content: '<wda-error-404></wda-error-404>'
            })
          }
          return;
        }
        this.loadPagesContent({
          content: '<wda-error-500></wda-error-500>'
        })
      })
  }

  private LoadPages(segments: UrlSegment[]) {
    this.wdaConfig.getPage(segments).then(data => {
      if (data) {
        this.loadPagesContent(data);
      } else {
        // TODO: load the 404 component dynamically based on theme, instead of redirecting
        // this.router.navigateByUrl('not-found');
        this.loadPagesContent({
          content: '<wda-error-404></wda-error-404>'
        })
      }
    }, (error) => {
      if (error.errors.length > 0) {
        if (error.errors[0].status[0] === '4') {
          this.loadPagesContent({
            content: '<wda-error-404></wda-error-404>'
          })
        }
        return;
      }
      this.loadPagesContent({
        content: '<wda-error-500></wda-error-500>'
      })

      // TODO: maybe others errors? Right now everything is 500 - Internal Server Error
      // TODO: load the component dynamically based on theme, instead of redirecting
      //this.router.navigateByUrl('internal-server-error');
    })
  }

  private loadPagesContent(data) {
    data = this.getPageContent(data);
    if (this.bodyRef) {
      this.bodyRef.destroy();
      this.bodyRef = null;
    }
    this.bodyContainer.clear();
    this.bodyRef = this.bodyContainer.createComponent(data.bodyFactory, 0, this.injector);

    (<CoreDynamicCustomComponent>this.bodyRef.instance).ngOnInit = () => {
      if (this.completeLoadCallback) {
        setTimeout(() => {
          this.completeLoadCallback();
        }, 200);
      }

    }

  }

}
