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
import {Injectable} from "@angular/core";
import {WDAConfig} from "@core/services/src/lib/wda-config.service";
import {PageModel} from "@core/cms/src/lib/models";
import {ErrorResponse} from "angular2-jsonapi";

@Injectable()
export class CoreDynamicPageLoaderResolver implements Resolve<PageModel|ErrorResponse> {

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

      return this.wdaConfig.getPage(urlSegments).then((data: PageModel) => {
          return data;
        },
        (error: ErrorResponse) => {
          return error;
        })

    } else {
      return this.wdaConfig.getHome().then((data: PageModel) => {
          return data;
        },
        (error: ErrorResponse) => {
          return error;
        })
    }


  }
}




