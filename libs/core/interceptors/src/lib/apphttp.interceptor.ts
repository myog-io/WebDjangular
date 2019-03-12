import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Injector, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { switchMap, skip } from 'rxjs/operators';

import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap(function(token) {
        const suffix = request.url;
        let url = '/';

        if (suffix.search('http://') === -1 && suffix.search('https://') === -1) {
          let parts = suffix.split('');
          if (parts[0] === '/') {
            parts.shift();
          }

          let imploded = parts.join('');

          url += imploded;
        } else {
          url = request.url;
        }
        // Forcing Trailing Slash
        let parts = url.split('?');
        if (parts[0]) {
          // Checking if is a File... Patern .png .jpg
          if (parts[0].search(/\.[0-9a-z]{1,5}$/i) === -1){
            if (parts[0][parts[0].length - 1] != '/') {
              if (parts[1]) {
                url = parts[0] + '/?' + parts[1];
              } else {
                url = parts[0] + '/';
              }
            }
          }
        }
        let newHeaders = {};

        if (request.headers.get('Accept') == null) {
          newHeaders['Accept'] = 'application/vnd.api+json';
        }

        if (request.headers.get('Content-Type') == null) {
          newHeaders['Content-Type'] = 'application/vnd.api+json';
        }
        console.log("Token valid?",token.isValid());
        if (token.isValid() && request.headers.get('Authorization') !== 'none') {
          newHeaders['Authorization'] = 'Bearer ' + token.getValue();
          var req = request.clone({
            url: url,
            setHeaders: newHeaders
          });
        } else {
          var req = request.clone({
            url: url,
            setHeaders: newHeaders
          });
        }

        return next.handle(req);
      })
    );
  }

  get authService() {
    return this.injector.get(NbAuthService);
  }
}
