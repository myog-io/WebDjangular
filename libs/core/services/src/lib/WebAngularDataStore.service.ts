import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  JsonApiDatastoreConfig,
  JsonApiDatastore,
  DatastoreConfig,
  JsonApiModel,
  ModelType
} from 'angular2-jsonapi';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';

const config: DatastoreConfig = {
  baseUrl: '/api',
  //models: modelList
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class WebAngularDataStore extends JsonApiDatastore {
  constructor(http: HttpClient) {
    super(http);
  }

  get<T extends JsonApiModel>(
    modelType: ModelType<T>,
    params?: any,
    headers?: Headers,
    customUrl?: string,
    id?: any
  ): Observable<any> {
    const url: string = this.buildUrl(modelType, params, id, customUrl);
    return this.http
      .get(url, { headers: this.buildHeaders(headers) })
      .map((res: any) => {
        console.log(res);
        this.extractQueryData(res, modelType, true);
      })
      .catch((res: any) => this.handleError(res));
  }

  post<T extends JsonApiModel>(
    modelType: ModelType<T>,
    params?: any,
    headers?: Headers,
    customUrl?: string,
    attributesMetadata?: any,
    id?: any
  ): Observable<T> {
    const requestHeaders: HttpHeaders = this.buildHeaders(headers);
    const url: string = this.buildUrl(modelType, params, id, customUrl);
    const body: any = {
      data: params
    };

    return this.http
      .post(url, body, { headers: requestHeaders, observe: 'response' })
      .map((res: any) => this.extractQueryData(res, modelType, true))
      .catch((res: any) => this.handleError(res));
  }

  saveHasManyRelationship<T extends JsonApiModel>(
    hasManyFields = [],
    modelConfig = {},
    extraOptions = {},
    model: JsonApiModel
  ): Observable<any> {
    return new Observable(observe => {
      for (let i = 0; i < hasManyFields.length; i++) {
        let url =
          modelConfig['type'] +
          '/' +
          String(model.pk) +
          '/relationships/' +
          String(hasManyFields[i].relationship) +
          '/';
        let pointer = [];
        let typeToSend = modelConfig['type'];

        /*
    				Check if we don't have a different type in the backend
    				That property is the "resource_name" that can be set on the ViewSet
    				or in the Model. In the case of updating relationships, the resouce_name
    				has to be set in the model, if it is not set, the code will get the model
    				name to use as "resource_name". Some models we cannot change, such as Permission and Group
    				which are built in Djangos code and there is no way to override those models.
    				Because of that we have an additional configuration <backendResourceName> in the angular
    				model where we can set this name.
    			*/
        if (
          typeof extraOptions[hasManyFields[i].propertyName][
            'backendResourceName'
          ] !== 'undefined'
        ) {
          typeToSend =
            extraOptions[hasManyFields[i].propertyName]['backendResourceName'];
        }

        if (typeof model[hasManyFields[i].propertyName] !== 'undefined') {
          for (
            let j = 0;
            j < model[hasManyFields[i].propertyName].length;
            j++
          ) {
            pointer.push({
              id: model[hasManyFields[i].propertyName][j].pk,
              type: typeToSend
            });
          }
        }

        let body: any = {
          data: {
            pointer: pointer,
            type: modelConfig['type'],
            relationships: {},
            id: model.pk
          }
        };

        let httpCall = this.http
          .patch(url, body, { headers: this.buildHeaders() })
          .subscribe(r => {
            if (i + 1 == hasManyFields.length) {
              observe.complete();
            } else {
              observe.next(r);
            }
          });
      }
    });
  }
}
