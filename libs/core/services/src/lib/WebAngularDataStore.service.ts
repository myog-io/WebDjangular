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
    CoreConfig: CoreConfigModel
  }
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class WebAngularDataStore extends JsonApiDatastore {

}
