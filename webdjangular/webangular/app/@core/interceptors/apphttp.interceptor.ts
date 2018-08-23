import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() { }
    


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = environment.api_endpoint;
        let suffix = request.url;

        if (suffix.search("http://") == -1 && suffix.search("https://") == -1) {
            let parts = suffix.split("");
            if (parts[0] == "/") {
                parts.shift();
            }

            let imploded = parts.join("");

            url += imploded;
        }

        request = request.clone({
            url: url
        });

        return next.handle(request);
    }

}
