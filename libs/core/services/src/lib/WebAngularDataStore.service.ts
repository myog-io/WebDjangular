import { Injectable } from '@angular/core';
import {
  JsonApiDatastoreConfig,
  JsonApiDatastore,
  DatastoreConfig,
  JsonApiModel,
  Overrides,
} from 'angular2-jsonapi';

import { UserModel, GroupModel, PermissionModel } from '@webdjangular/core/users-models';
import { PageModel, BlockModel } from '@webdjangular/core/cms-models';
import { ContentTypeModel, AbstractModel } from '@webdjangular/core/data-models';
import { CoreConfigGroupModel } from 'libs/core/data/src/lib/models/CoreConfigGroup.model';
import { CoreConfigInputModel } from 'libs/core/data/src/lib/models/CoreConfigInput.model';
import { CoreConfigModel } from 'libs/core/data/src/lib/models/CoreConfig.model';
import { CityModel } from '@webdjangular/plugins/provider-data';
import { ProductModel } from 'libs/plugins/store/src/lib/data/models/Product.model';
import { ProductTypeModel } from 'libs/plugins/store/src/lib/data/models/ProductType.model';
import { Observable } from 'rxjs';


const config: DatastoreConfig = {
  baseUrl: '/api',
  //TODO: Load all This Dynamic
  models: {
    User: UserModel,
    Group: GroupModel,
    Page: PageModel,
    Block: BlockModel,
    Permission: PermissionModel,
    ContentType: ContentTypeModel,
    CoreConfigGroup: CoreConfigGroupModel,
    CoreConfigInput: CoreConfigInputModel,
    CoreConfig: CoreConfigModel,
    City: CityModel,
    Product: ProductModel,
    ProductType: ProductTypeModel,
  }
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class WebAngularDataStore extends JsonApiDatastore {
  protected getRelationships(data: any): any {
    let relationships: any;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] instanceof AbstractModel) {

          relationships = relationships || {};

          if (data[key].id) {
            relationships[key] = {
              data: this.buildSingleRelationshipData(data[key])
            };
          }
        } else if (data[key] instanceof Array && data[key].length > 0 && this.isValidToManyRelation(data[key])) {

          relationships = relationships || {};

          const relationshipData = data[key]
            .filter((model: AbstractModel) => model.id)
            .map((model: AbstractModel) => this.buildSingleRelationshipData(model));

          relationships[key] = {
            data: relationshipData
          };
        } else if (data[key] instanceof Array) {
          relationships = relationships || {};
          // Cleaning to Many Relationship
          relationships[key] = {
            data: []
          };
        }
      }
    }
    return relationships;
  }

  saveHasManyRelationship<T extends JsonApiModel>(hasManyFields = [], modelConfig = {}, extraOptions = {}, model: JsonApiModel): Observable<any> {
    return new Observable(observe => {
      for (let i = 0; i < hasManyFields.length; i++) {
        let url = `${modelConfig['type']}/${model.pk}/relationships/${hasManyFields[i].relationship}/`;
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
        /*
        if (typeof extraOptions[hasManyFields[i].propertyName]['backendResourceName'] !== 'undefined') {
          typeToSend = extraOptions[hasManyFields[i].propertyName]['backendResourceName'];
        }
        if (typeof model[hasManyFields[i].propertyName] !== 'undefined') {
          for (let j = 0; j < model[hasManyFields[i].propertyName].length; j++) {
            pointer.push({
              id: model[hasManyFields[i].propertyName][j].pk,
              type: typeToSend
            });
          }
        }*/
        let body: any = {
          data: null // TODO: Improve this
        };
        this.http.patch(url, body, { headers: this.buildHttpHeaders() }).subscribe(
          (r) => {
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
