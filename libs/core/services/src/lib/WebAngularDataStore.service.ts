import { Injectable } from '@angular/core';
import {
  JsonApiDatastoreConfig,
  JsonApiDatastore,
  DatastoreConfig,
} from 'angular2-jsonapi';

import { UserModel, GroupModel, PermissionModel } from '@webdjangular/core/users-models';
import { PageModel, BlockModel } from '@webdjangular/core/cms-models';
import { ContentTypeModel } from '@webdjangular/core/data-models';
import { CoreConfigGroupModel } from 'libs/core/data/src/lib/models/CoreConfigGroup.model';
import { CoreConfigInputModel } from 'libs/core/data/src/lib/models/CoreConfigInput.model';
import { CoreConfigModel } from 'libs/core/data/src/lib/models/CoreConfig.model';
import { CityModel } from '@webdjangular/plugins/provider-data';
import { ProductModel } from 'libs/plugins/store/src/lib/data/models/Product.model';
import { ProductTypeModel } from 'libs/plugins/store/src/lib/data/models/ProductType.model';

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

}
