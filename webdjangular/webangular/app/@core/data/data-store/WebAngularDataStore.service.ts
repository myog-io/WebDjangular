import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NbAuthService, NbTokenService, NbAuthSimpleToken, NbAuthJWTToken} from '@nebular/auth';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';

import { environment } from "../../../../environments/environment";

import { modelList } from '../models/models.list';


const config: DatastoreConfig = {
  baseUrl: environment.api_endpoint,
  models: modelList
}

@Injectable()
@JsonApiDatastoreConfig(config)
export class WebAngularDataStore extends JsonApiDatastore {

    constructor(
    	http: HttpClient
    ) {
        super(http);
    }

}