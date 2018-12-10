import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data-models';
import { PermissionModel } from '@webdjangular/core/users-models';


import { ExtraOptions } from '@webdjangular/core/decorator';
import { PageModel } from '@webdjangular/core/cms-models';
import { CityModel } from '../models/City.model';
import { PageRedirectForm } from '../forms/PageRedirect.form';

@JsonApiModelConfig({
  type: 'PageRedirect',
  modelEndpointUrl: 'provider/page-redirect',
})
export class PageRedirectModel extends AbstractModel {
  public static formClassRef = PageRedirectForm;
  public static include = 'default_page,redirect_page,cities';

  @Attribute()
  id: string;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'Page'
  })
  default_page: PageModel;

  @BelongsTo()
  @ExtraOptions({
    backendResourceName: 'Page'
  })
  redirect_page: PageModel;

  @HasMany()
  @ExtraOptions({
    backendResourceName: 'City'
  })
  cities: CityModel;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[]

  get pk() {
    return this.id;
  }

  set pk(value) {

  }

}

