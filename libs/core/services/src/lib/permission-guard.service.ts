import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs/operators/tap';

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    canActivate() {

        this.route.data.subscribe(
            (data) => {
            }
        )


        return true;
        //return this.authService.isAuthenticated().pipe(
        //    tap(authenticated => {
        //        if (!authenticated) {
        //            this.router.navigate(['auth/login']);
        //        }
        //    }),
        //);
    }
}
