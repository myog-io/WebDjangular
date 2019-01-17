import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { UrlSegment, ActivatedRoute } from '@angular/router';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';



@Component({
  selector: 'webdjangular-dynamic-page-loader',
  template: `
  <wda-content-viewer [content]="content" ></wda-content-viewer>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class CoreDynamicPageLoaderComponent implements AfterViewInit {
  public content = '<h1>Testing</h1>';
  private url = null;
  private domain = null;
  //private paramSubscription;
  private links = []
  //private bodyRef: ComponentRef<{}>;
  public completeLoadCallback = null;
  //@ViewChild('bodyContainer', { read: ViewContainerRef }) bodyContainer: ViewContainerRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private wdaConfig: WDAConfig,
  ) {
    this.links.push(
      { path: '**', pathMatch: 'full', component: CoreDynamicPageLoaderComponent },
    );
    /*
    Scrolling on the Page
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
    */
  }

  async ngAfterViewInit() {
    this.domain = document.location.hostname;
    this.url = document.location.protocol + '//' + this.domain;
    this.activatedRoute.url.subscribe((segments: UrlSegment[]) => {
      console.log(segments)
      if (segments.length <= 0) {
        this.HomePage();
      } else {
        this.LoadPages(segments);
      }
    });

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
  }

  private loadPagesContent(data) {
    this.content = data.content;
  }

}
