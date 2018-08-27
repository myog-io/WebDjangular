import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { switchMap } from 'rxjs/operators';

import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.getToken().pipe(switchMap(function (token) {
            if (token.isValid()) {
                var JWT = "JWT " + token.getValue();
                var req = request.clone({
                    setHeaders: {
                        Authorization: JWT
                    },
                });
                return next.handle(req);
            }
            else{
                var req = request.clone({

                });
                return next.handle(req);
            }
        }));
    }

    get authService(){
        return this.injector.get(NbAuthService);
    }

}
