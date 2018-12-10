import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { UserModel } from '@webdjangular/core/users-forms';
import { CookieService } from 'ngx-cookie-service';
import { WebAngularDataStore } from './WebAngularDataStore.service';


export interface CookieClientUser {
  id?: string;
  first_name?: string;
  username?: string;
  data?: any;
}


@Injectable({
  providedIn: 'root',
})
export class ClientUserService {

  public clientUser: UserModel;


  constructor(private http: HttpClient,
    private datastore: WebAngularDataStore,
    private cookieService: CookieService) {

    const userExists: boolean = cookieService.check('clientUser');
    let userCookie: CookieClientUser;
    if (userExists) {
      userCookie = JSON.parse(cookieService.get('clientUser'));
    } else {
      userCookie = {
        first_name: 'Guest',
        data: {}
      };
      cookieService.set('clientUser', JSON.stringify(userCookie));
    }

    if (!userCookie.id) {
      this.clientUser = new UserModel(datastore, { attributes: userCookie });
      this.clientUser.data = userCookie.data;
    } else {
      this.datastore.findRecord(UserModel, userCookie.id, {}).subscribe(
        (user: UserModel) => {
          this.clientUser = user;
          this.clientUser.data = userCookie.data;
        }, (error: any) => {
          this.clientUser = new UserModel(datastore, { attributes: userCookie });
          this.clientUser.data = userCookie.data;
        }
      );
    }
  }

  public updateCookie() {
    const userCookie: CookieClientUser = {
      id: this.clientUser.id,
      first_name: this.clientUser.first_name,
      username: this.clientUser.username,
      data: this.clientUser.data
    };
    this.cookieService.set('clientUser', JSON.stringify(userCookie));
  }

}
