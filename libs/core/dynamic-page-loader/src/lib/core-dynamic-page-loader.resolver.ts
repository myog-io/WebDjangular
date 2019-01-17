import {
  ActivatedRouteSnapshot,
  PRIMARY_OUTLET,
  Resolve,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree
} from "@angular/router";
import {Inject, Injectable, Optional, PLATFORM_ID} from "@angular/core";
import {WDAConfig} from "@core/services/src/lib/wda-config.service";
import {RESPONSE} from "@nguniversal/express-engine/tokens";
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class CoreDynamicPageLoaderResolver implements Resolve<any> {

  constructor(public router: Router,
              public wdaConfig: WDAConfig) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) {

    const tree: UrlTree = this.router.parseUrl(state.url);
    const urlSegmentGroup: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];

    // find the page based on the URL Segments, otherwise load the HOME Page
    if (urlSegmentGroup) {
      const urlSegments: UrlSegment[] = urlSegmentGroup.segments;

      return this.wdaConfig.getPage(urlSegments).then((data: any) => {
          return data;
        },
        (error) => {
          console.log(error);
          return error;
        })

    } else {
      return this.wdaConfig.getHome().then((data: any) => {
          return data;
        },
        (error) => {
          console.log(error);
          return error;
        })
    }


  }
}




