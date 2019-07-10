import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  Inject,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup } from '@angular/router';
import { PageModel } from '@core/cms/src/lib/models';
import { ErrorResponse } from 'angular2-jsonapi';

import { SEOService } from '@core/services/src/lib/seo.service';
//import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import { DOCUMENT } from '@angular/common';
import { BlockHeaderModel } from '@core/cms/src/lib/models/BlockHeader.model';
import { BlockFooterModel } from '@core/cms/src/lib/models/BlockFooter.model';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';
import { ClientUserService } from '@core/services/src/lib/client-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'webdjangular-dynamic-page-loader',
  template: `
    <wda-content-viewer class="header" [content]="header"></wda-content-viewer>
    <wda-content-viewer
      class="body"
      [content]="content"
      (docRendered)="renderComplete()"
    ></wda-content-viewer>
    <wda-content-viewer class="footer" [content]="footer"></wda-content-viewer>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreDynamicPageLoaderComponent implements AfterViewInit, OnDestroy {
  public content: string;
  public header: string;
  public footer: string;
  public current_header: BlockHeaderModel;
  public current_footer: BlockFooterModel;
  public url = null;
  private domain = null;
  //private paramSubscription;
  private links = [];
  //private bodyRef: ComponentRef<{}>;
  public completeLoadCallback = null;
  private cookieSub: Subscription;
  private routeSub: Subscription;
  //@ViewChild('bodyContainer', { read: ViewContainerRef }) bodyContainer: ViewContainerRef;

  constructor(
    private wdaConfig: WDAConfig,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public seo: SEOService,
    public router: Router,
    public clientUserService: ClientUserService,
    //private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {

    this.links.push({
      path: '**',
      pathMatch: 'full',
      component: CoreDynamicPageLoaderComponent
    });
    //this.cdr.detach();

    //Scrolling on the Page
    if (this.document) {
      this.router.events.subscribe((event: any) => {
        if (event.anchor) {
          this.completeLoadCallback = () => {
            this.completeLoadCallback = null;
          };
        }
      });
    }
  }

  async ngAfterViewInit() {
    this.domain = document.location.hostname;
    this.url = document.location.protocol + '//' + this.domain;


    this.routeSub = this.activatedRoute.data.subscribe((data: any) => {
      this.loadPagesContent(data.page);
    });
    this.cookieSub = this.clientUserService.clientCookieChange.subscribe((clientCoookie) => {
      this.reloadPage();
    });
  }
  public async reloadPage() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const urlSegmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    if (urlSegmentGroup) {
      const urlSegments: UrlSegment[] = urlSegmentGroup.segments;
      try {
        const page = await this.wdaConfig.getPage(urlSegments);
        this.loadPagesContent(page);
      }
      catch (error) {
        this.loadPagesContent(error);
      }
    } else {
      try {
        const home = await this.wdaConfig.getHome();
        this.loadPagesContent(home);
      }
      catch (error_1) {
        this.loadPagesContent(error_1);
      }
    }


  }
  public renderComplete() {
    if (this.completeLoadCallback) {
      this.completeLoadCallback();
    }
  }
  private loadPagesContent(page: PageModel | ErrorResponse) {
    // TODO: Improve instead of re-generate the intire page we should just re-generate what changed
    if (this.wdaConfig.current_header)
      this.header = this.wdaConfig.current_header.getContent();
    if (this.wdaConfig.current_footer)
      this.footer = this.wdaConfig.current_footer.getContent();
    if (page instanceof PageModel) {
      this.content = page.getContent();
      this.seo.setTitleByPage(page);
      this.seo.createMetaByPage(page);
    } else if (page instanceof ErrorResponse) {
      if (page.errors) {
        if (page.errors.length > 0) {
          if (page.errors[0].status === '404') {
            this.content = `<wda-error-404></wda-error-404>`;
            return;
          }
        }

        this.content = `<wda-error-500></wda-error-500>`;
      } else {
        this.content = `<wda-error-404></wda-error-404>`;
      }
    }
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    if (this.cookieSub) {
      this.cookieSub.unsubscribe();
      this.cookieSub = null;
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
      this.routeSub = null;
    }
  }
}
