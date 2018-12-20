import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WebAngularDataStore} from "@webdjangular/core/services";

@Injectable({
  providedIn: 'root',
})
export class CartService {


  constructor(private http: HttpClient,
              private datastore: WebAngularDataStore) {

  }


}
