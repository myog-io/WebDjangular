import {
  JsonApiModelConfig,
  Attribute,
} from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from '@webdjangular/core/users-models';

import { CoreWebsiteForm } from '../forms/CoreWebsite.form';

@JsonApiModelConfig({
  type: 'core_website'
})
export class CoreWebsiteModel extends AbstractModel {
  public static formClassRef = CoreWebsiteForm;

  @Attribute()
  id: string;

  @Attribute()
  domain: string;

  @Attribute()
  code: string;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;



  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }

  set pk(value) {}
}
