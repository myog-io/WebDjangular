import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';


import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider, NbAclService } from '@nebular/security';

import { WebAngularDataStore } from '../data/data-store/WebAngularDataStore.service';

import { PermissionModel } from '../data/models/Permission.model';
import { GroupModel } from '../data/models/Group.model';
import { UserModel } from '../data/models/User.model';

@Injectable()
export class RoleProvider implements NbRoleProvider {
    userPermissions: PermissionModel[] = [];

    private roleName = 'userRole';

    constructor(
        private authService: NbAuthService,
        private nbAclService: NbAclService,
        private datastore: WebAngularDataStore,
    ) {

        let sub = this.getUserPermissions().subscribe((permissions) => {
            this.userPermissions = permissions;
            this.definePermissionRole().then(permissions => {
                this.nbAclService.register(this.roleName, null, permissions);                
                sub.unsubscribe();
                console.log(permissions)
            });
        })
    }

    getRole(): Observable<string> {
        return observableOf(this.roleName);
    }

    getUserPermissions(): Observable<PermissionModel[]>{
        return this.datastore.findAll(PermissionModel, {include: 'content_type'}, null, '/api/userpermissions').pipe(map(
            (res) => res.getModels()
        ));
    }

    definePermissionRole(): Promise<any>{
        return new Promise((resolve, reject) => {
            let parsedPermissions = {};

            for(let i=0; i < this.userPermissions.length; i++){
                if (typeof parsedPermissions[this.userPermissions[i].content_type.app_label] == 'undefined'){
                    parsedPermissions[this.userPermissions[i].content_type.app_label] = [];
                }

                parsedPermissions[this.userPermissions[i].content_type.app_label].push(this.userPermissions[i].codename)
            }
            resolve(parsedPermissions);
        });
        
    }
}
