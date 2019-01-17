import {
  AfterViewInit,
  Compiler,
  Component,
  ComponentRef,
  Inject,
  Injector,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {DOCUMENT, Meta, Title} from '@angular/platform-browser';
import {PageScrollInstance, PageScrollService} from 'ngx-page-scroll';
import {WDAConfig} from '@core/services/src/lib/wda-config.service';
import {
  CoreDynamicComponentLoader,
  CoreDynamicCustomComponent
} from '@core/dynamic-component-loader/src/lib/core-dynamic-component-loader.service';
import {ThemesCleanModule} from '@themes/clean/src/lib/themes-clean.module';
import {ErrorResponse} from "angular2-jsonapi";
import {PageModel} from "@core/cms/src/lib/models";

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
  private links = [];
  private bodyRef: ComponentRef<{}>;
  public completeLoadCallback = null;
  @ViewChild('bodyContainer', {read: ViewContainerRef}) bodyContainer: ViewContainerRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wdaConfig: WDAConfig,
    private componentLoader: CoreDynamicComponentLoader,
    private compiler: Compiler,
    private injector: Injector,
    private pageScrollService: PageScrollService,
    public meta: Meta,
    public title: Title,
    @Inject(DOCUMENT) private document: any
  ) {
    this.links.push(
      {
        path: '**', pathMatch: 'full',
        component: CoreDynamicPageLoaderComponent,
      },
    );

    this.router.events.subscribe((event: any) => {
      if (event.anchor) {
        this.completeLoadCallback = () => {
          this.completeLoadCallback = null;
          let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
            document: this.document,
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
      this.loadPage();
      //if (segments.length <= 0) {
      //  this.HomePage();
      //} else {
      //  this.LoadPages(segments);
      //}
    });

  }

  private getPageContent(data: any) {

    const metadata = {
      selector: 'wda-body',
      template: data.content,
      encapsulation: ViewEncapsulation.None
    };

    data.bodyFactory = this.componentLoader.createComponentFactorySync(metadata,
      null, this.compiler);
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
    });

    // Putting Last in correct Order
    this.links.push(last);

    this.router.resetConfig(this.links);
    this.router.navigate(path);
  }

  private loadPage() {
    let page = this.activatedRoute.snapshot.data['page'];

    if (page instanceof PageModel) {
      this.loadPagesContent(page);
    } else if (page instanceof ErrorResponse) {
      if (page.errors) {
        if (page.errors.length > 0) {
          if (page.errors[0].status === "404") {
            this.loadPagesContent({
              content: '<wda-error-404></wda-error-404>'
            })
          }
          return;
        }
        this.loadPagesContent({
          content: '<wda-error-500></wda-error-500>'
        })
      } else {
        this.loadPagesContent({
          content: '<wda-error-404></wda-error-404>'
        })
      }
    }
  }


  private HomePage() {
    //this.loadPagesContent();

    /*
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
        console.log(error)
        if (error.errors) {
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
        } else {
          this.loadPagesContent({
            content: '<wda-error-404></wda-error-404>'
          })
        }
      })
      */
  }

  private LoadPages(segments: UrlSegment[]) {
    console.log(this.activatedRoute.snapshot.data['page']);
    this.loadPagesContent(this.activatedRoute.snapshot.data['page']);

    /*
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
      if (error.errors) {
        if (error.errors.length > 0) {
          if (error.errors[0].status[0] === '4') {
            this.loadPagesContent({
              content: '<wda-error-404></wda-error-404>'
            })
          }
          return;
        }
      }
      this.loadPagesContent({
        content: '<wda-error-500></wda-error-500>'
      })

      // TODO: maybe others errors? Right now everything is 500 - Internal Server Error
      // TODO: load the component dynamically based on theme, instead of redirecting
      //this.router.navigateByUrl('internal-server-error');
    })
    */
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
    };

    this.title.setTitle('DAAAN');
    this.meta.addTags([
      {name: 'author', content: 'Daniel H G Mescoloto'},
      {name: 'keywords', content: 'pudim, wda'},
      {name: 'description', content: 'I really like pudim'}
    ]);

  }

}
