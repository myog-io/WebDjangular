import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NbRoleProvider, NbAclService } from '@nebular/security';
import { of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebAngularDataStore } from './WebAngularDataStore.service';
import { PermissionModel } from '@core/users/src/lib/models';

@Injectable()
export class RoleProvider implements NbRoleProvider {
  userPermissions: PermissionModel[] = [];

  parsedPermissionsEmitter = new EventEmitter<any>(null);

  private roleName = 'userRole';

  constructor(
    private nbAclService: NbAclService,
    private datastore: WebAngularDataStore
  ) {
    let sub = this.getUserPermissions().subscribe(permissions => {
      this.userPermissions = permissions;
      this.definePermissionRole().then(permissions => {
        this.nbAclService.register(this.roleName, null, permissions);
        sub.unsubscribe();
        this.parsedPermissionsEmitter.emit(permissions);
      });
    });
  }

  getRole(): Observable<string> {
    return observableOf(this.roleName);
  }

  getUserPermissions(): Observable<PermissionModel[]> {
    return this.datastore
      .findAll(
        PermissionModel,
        { include: 'content_type' },
        null,
        '/api/userpermissions'
      )
      .pipe(map(res => res.getModels()));
  }

  definePermissionRole(): Promise<any> {
    return new Promise((resolve, reject) => {
      let parsedPermissions = {};

      for (let i = 0; i < this.userPermissions.length; i++) {
        if (
          typeof parsedPermissions[
            this.userPermissions[i].content_type.app_label
          ] === 'undefined'
        ) {
          parsedPermissions[
            this.userPermissions[i].content_type.app_label
          ] = [];
        }

        parsedPermissions[this.userPermissions[i].content_type.app_label].push(
          this.userPermissions[i].codename
        );
      }

      resolve(parsedPermissions);
    });
  }
}
