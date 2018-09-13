import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable, Injector, Inject } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { switchMap } from 'rxjs/operators';

import { NbAuthService } from '@nebular/auth';

import { environment } from "../../../environments/environment";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.getToken().pipe(switchMap(function (token) {
            let suffix = request.url;
            let url = '/';

            if (suffix.search("http://") == -1 && suffix.search("https://") == -1) {
                let parts = suffix.split("");
                if (parts[0] == "/") {
                    parts.shift();
                }

                let imploded = parts.join("");

                url += imploded;
            }
            else{
                url = request.url;
            }

            let newHeaders = {};

            if (request.headers.get('Accept') == null){
                newHeaders['Accept'] = 'application/vnd.api+json'
            }

            if (request.headers.get('Content-Type') == null){
                newHeaders['Content-Type'] = 'application/vnd.api+json'
            }

            if (token.isValid()) {
                newHeaders['Authorization'] = "Bearer " + token.getValue();
                var req = request.clone({
                    url: url,
                    setHeaders: newHeaders,
                });
            }
            else{
                var req = request.clone({
                    url: url,
                    setHeaders: newHeaders
                });
            }

            return next.handle(req);
        }));
    }

    get authService(){
        return this.injector.get(NbAuthService);
    }
}
