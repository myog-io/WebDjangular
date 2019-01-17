import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import {PageModel} from "@core/cms/src/lib/models";
import {ErrorResponse} from "angular2-jsonapi";



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
  }


  private loadPagesContent(data:PageModel|ErrorResponse) {
    if (data instanceof PageModel) {
      this.content = data.content;
    } else if (data instanceof ErrorResponse) {
      if (data.errors) {
        if (data.errors.length > 0) {
          if (data.errors[0].status === "404") {
            this.content = `<wda-error-404></wda-error-404>`;
            return;
          }
        }
        this.content = `<wda-error-500></wda-error-500>`;
      } else {
        this.content = `<wda-error-404></wda-error-404>`;
      }
    }


  }

}
