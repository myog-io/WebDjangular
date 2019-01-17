import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'webdjangular-dynamic-page-loader',
  template: `
  <wda-content-viewer [content]="content" ></wda-content-viewer>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreDynamicPageLoaderComponent implements AfterViewInit {
  public content = '';
  private url = null;
  private domain = null;
  //private paramSubscription;
  private links = []
  //private bodyRef: ComponentRef<{}>;
  public completeLoadCallback = null;
  //@ViewChild('bodyContainer', { read: ViewContainerRef }) bodyContainer: ViewContainerRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {
    this.links.push(
      { path: '**', pathMatch: 'full', component: CoreDynamicPageLoaderComponent },
    );
    //this.cdr.detach();
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
    this.activatedRoute.data.subscribe((data:any)=>{
      this.loadPagesContent(data.page);
      this.cdr.detectChanges();
    })
    //this.activatedRoute.url.subscribe((segments: UrlSegment[]) => {
    //  console.log(segments)
    //  if (segments.length <= 0) {
    //    this.HomePage();
    //  } else {
    //    this.LoadPages(segments);
    //  }
    //});

  }


  private loadPagesContent(data:any) {
    this.content = data.content;
  }

}
